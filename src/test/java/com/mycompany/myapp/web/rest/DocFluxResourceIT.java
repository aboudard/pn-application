package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.PnApplicationApp;
import com.mycompany.myapp.domain.DocFlux;
import com.mycompany.myapp.repository.DocFluxRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link DocFluxResource} REST controller.
 */
@SpringBootTest(classes = PnApplicationApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class DocFluxResourceIT {

    private static final String DEFAULT_ID_EDITION = "AAAAAAAAAA";
    private static final String UPDATED_ID_EDITION = "BBBBBBBBBB";

    private static final String DEFAULT_LIBELLE = "AAAAAAAAAA";
    private static final String UPDATED_LIBELLE = "BBBBBBBBBB";

    private static final String DEFAULT_MODELE = "AAAAAAAAAA";
    private static final String UPDATED_MODELE = "BBBBBBBBBB";

    private static final String DEFAULT_FAMILLE = "AAAAAAAAAA";
    private static final String UPDATED_FAMILLE = "BBBBBBBBBB";

    private static final String DEFAULT_VERSION = "AAAAAAAAAA";
    private static final String UPDATED_VERSION = "BBBBBBBBBB";

    @Autowired
    private DocFluxRepository docFluxRepository;

    @Mock
    private DocFluxRepository docFluxRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDocFluxMockMvc;

    private DocFlux docFlux;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DocFlux createEntity(EntityManager em) {
        DocFlux docFlux = new DocFlux()
            .idEdition(DEFAULT_ID_EDITION)
            .libelle(DEFAULT_LIBELLE)
            .modele(DEFAULT_MODELE)
            .famille(DEFAULT_FAMILLE)
            .version(DEFAULT_VERSION);
        return docFlux;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DocFlux createUpdatedEntity(EntityManager em) {
        DocFlux docFlux = new DocFlux()
            .idEdition(UPDATED_ID_EDITION)
            .libelle(UPDATED_LIBELLE)
            .modele(UPDATED_MODELE)
            .famille(UPDATED_FAMILLE)
            .version(UPDATED_VERSION);
        return docFlux;
    }

    @BeforeEach
    public void initTest() {
        docFlux = createEntity(em);
    }

    @Test
    @Transactional
    public void createDocFlux() throws Exception {
        int databaseSizeBeforeCreate = docFluxRepository.findAll().size();

        // Create the DocFlux
        restDocFluxMockMvc.perform(post("/api/doc-fluxes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(docFlux)))
            .andExpect(status().isCreated());

        // Validate the DocFlux in the database
        List<DocFlux> docFluxList = docFluxRepository.findAll();
        assertThat(docFluxList).hasSize(databaseSizeBeforeCreate + 1);
        DocFlux testDocFlux = docFluxList.get(docFluxList.size() - 1);
        assertThat(testDocFlux.getIdEdition()).isEqualTo(DEFAULT_ID_EDITION);
        assertThat(testDocFlux.getLibelle()).isEqualTo(DEFAULT_LIBELLE);
        assertThat(testDocFlux.getModele()).isEqualTo(DEFAULT_MODELE);
        assertThat(testDocFlux.getFamille()).isEqualTo(DEFAULT_FAMILLE);
        assertThat(testDocFlux.getVersion()).isEqualTo(DEFAULT_VERSION);
    }

    @Test
    @Transactional
    public void createDocFluxWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = docFluxRepository.findAll().size();

        // Create the DocFlux with an existing ID
        docFlux.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDocFluxMockMvc.perform(post("/api/doc-fluxes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(docFlux)))
            .andExpect(status().isBadRequest());

        // Validate the DocFlux in the database
        List<DocFlux> docFluxList = docFluxRepository.findAll();
        assertThat(docFluxList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllDocFluxes() throws Exception {
        // Initialize the database
        docFluxRepository.saveAndFlush(docFlux);

        // Get all the docFluxList
        restDocFluxMockMvc.perform(get("/api/doc-fluxes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(docFlux.getId().intValue())))
            .andExpect(jsonPath("$.[*].idEdition").value(hasItem(DEFAULT_ID_EDITION)))
            .andExpect(jsonPath("$.[*].libelle").value(hasItem(DEFAULT_LIBELLE)))
            .andExpect(jsonPath("$.[*].modele").value(hasItem(DEFAULT_MODELE)))
            .andExpect(jsonPath("$.[*].famille").value(hasItem(DEFAULT_FAMILLE)))
            .andExpect(jsonPath("$.[*].version").value(hasItem(DEFAULT_VERSION)));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllDocFluxesWithEagerRelationshipsIsEnabled() throws Exception {
        DocFluxResource docFluxResource = new DocFluxResource(docFluxRepositoryMock);
        when(docFluxRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restDocFluxMockMvc.perform(get("/api/doc-fluxes?eagerload=true"))
            .andExpect(status().isOk());

        verify(docFluxRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllDocFluxesWithEagerRelationshipsIsNotEnabled() throws Exception {
        DocFluxResource docFluxResource = new DocFluxResource(docFluxRepositoryMock);
        when(docFluxRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restDocFluxMockMvc.perform(get("/api/doc-fluxes?eagerload=true"))
            .andExpect(status().isOk());

        verify(docFluxRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getDocFlux() throws Exception {
        // Initialize the database
        docFluxRepository.saveAndFlush(docFlux);

        // Get the docFlux
        restDocFluxMockMvc.perform(get("/api/doc-fluxes/{id}", docFlux.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(docFlux.getId().intValue()))
            .andExpect(jsonPath("$.idEdition").value(DEFAULT_ID_EDITION))
            .andExpect(jsonPath("$.libelle").value(DEFAULT_LIBELLE))
            .andExpect(jsonPath("$.modele").value(DEFAULT_MODELE))
            .andExpect(jsonPath("$.famille").value(DEFAULT_FAMILLE))
            .andExpect(jsonPath("$.version").value(DEFAULT_VERSION));
    }

    @Test
    @Transactional
    public void getNonExistingDocFlux() throws Exception {
        // Get the docFlux
        restDocFluxMockMvc.perform(get("/api/doc-fluxes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDocFlux() throws Exception {
        // Initialize the database
        docFluxRepository.saveAndFlush(docFlux);

        int databaseSizeBeforeUpdate = docFluxRepository.findAll().size();

        // Update the docFlux
        DocFlux updatedDocFlux = docFluxRepository.findById(docFlux.getId()).get();
        // Disconnect from session so that the updates on updatedDocFlux are not directly saved in db
        em.detach(updatedDocFlux);
        updatedDocFlux
            .idEdition(UPDATED_ID_EDITION)
            .libelle(UPDATED_LIBELLE)
            .modele(UPDATED_MODELE)
            .famille(UPDATED_FAMILLE)
            .version(UPDATED_VERSION);

        restDocFluxMockMvc.perform(put("/api/doc-fluxes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedDocFlux)))
            .andExpect(status().isOk());

        // Validate the DocFlux in the database
        List<DocFlux> docFluxList = docFluxRepository.findAll();
        assertThat(docFluxList).hasSize(databaseSizeBeforeUpdate);
        DocFlux testDocFlux = docFluxList.get(docFluxList.size() - 1);
        assertThat(testDocFlux.getIdEdition()).isEqualTo(UPDATED_ID_EDITION);
        assertThat(testDocFlux.getLibelle()).isEqualTo(UPDATED_LIBELLE);
        assertThat(testDocFlux.getModele()).isEqualTo(UPDATED_MODELE);
        assertThat(testDocFlux.getFamille()).isEqualTo(UPDATED_FAMILLE);
        assertThat(testDocFlux.getVersion()).isEqualTo(UPDATED_VERSION);
    }

    @Test
    @Transactional
    public void updateNonExistingDocFlux() throws Exception {
        int databaseSizeBeforeUpdate = docFluxRepository.findAll().size();

        // Create the DocFlux

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDocFluxMockMvc.perform(put("/api/doc-fluxes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(docFlux)))
            .andExpect(status().isBadRequest());

        // Validate the DocFlux in the database
        List<DocFlux> docFluxList = docFluxRepository.findAll();
        assertThat(docFluxList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDocFlux() throws Exception {
        // Initialize the database
        docFluxRepository.saveAndFlush(docFlux);

        int databaseSizeBeforeDelete = docFluxRepository.findAll().size();

        // Delete the docFlux
        restDocFluxMockMvc.perform(delete("/api/doc-fluxes/{id}", docFlux.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DocFlux> docFluxList = docFluxRepository.findAll();
        assertThat(docFluxList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
