package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.PnApplicationApp;
import com.mycompany.myapp.domain.MetaReglement;
import com.mycompany.myapp.repository.MetaReglementRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link MetaReglementResource} REST controller.
 */
@SpringBootTest(classes = PnApplicationApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class MetaReglementResourceIT {

    private static final Long DEFAULT_ID_TECH = 1L;
    private static final Long UPDATED_ID_TECH = 2L;

    private static final String DEFAULT_SOCIETE = "AAAAAAAAAA";
    private static final String UPDATED_SOCIETE = "BBBBBBBBBB";

    private static final String DEFAULT_NUM_SINISTRE = "AAAAAAAAAA";
    private static final String UPDATED_NUM_SINISTRE = "BBBBBBBBBB";

    private static final String DEFAULT_NUM_CONTRAT_LGBT = "AAAAAAAAAA";
    private static final String UPDATED_NUM_CONTRAT_LGBT = "BBBBBBBBBB";

    private static final String DEFAULT_NUM_SOUS = "AAAAAAAAAA";
    private static final String UPDATED_NUM_SOUS = "BBBBBBBBBB";

    @Autowired
    private MetaReglementRepository metaReglementRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMetaReglementMockMvc;

    private MetaReglement metaReglement;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MetaReglement createEntity(EntityManager em) {
        MetaReglement metaReglement = new MetaReglement()
            .idTech(DEFAULT_ID_TECH)
            .societe(DEFAULT_SOCIETE)
            .numSinistre(DEFAULT_NUM_SINISTRE)
            .numContratLgbt(DEFAULT_NUM_CONTRAT_LGBT)
            .numSous(DEFAULT_NUM_SOUS);
        return metaReglement;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MetaReglement createUpdatedEntity(EntityManager em) {
        MetaReglement metaReglement = new MetaReglement()
            .idTech(UPDATED_ID_TECH)
            .societe(UPDATED_SOCIETE)
            .numSinistre(UPDATED_NUM_SINISTRE)
            .numContratLgbt(UPDATED_NUM_CONTRAT_LGBT)
            .numSous(UPDATED_NUM_SOUS);
        return metaReglement;
    }

    @BeforeEach
    public void initTest() {
        metaReglement = createEntity(em);
    }

    @Test
    @Transactional
    public void createMetaReglement() throws Exception {
        int databaseSizeBeforeCreate = metaReglementRepository.findAll().size();

        // Create the MetaReglement
        restMetaReglementMockMvc.perform(post("/api/meta-reglements")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(metaReglement)))
            .andExpect(status().isCreated());

        // Validate the MetaReglement in the database
        List<MetaReglement> metaReglementList = metaReglementRepository.findAll();
        assertThat(metaReglementList).hasSize(databaseSizeBeforeCreate + 1);
        MetaReglement testMetaReglement = metaReglementList.get(metaReglementList.size() - 1);
        assertThat(testMetaReglement.getIdTech()).isEqualTo(DEFAULT_ID_TECH);
        assertThat(testMetaReglement.getSociete()).isEqualTo(DEFAULT_SOCIETE);
        assertThat(testMetaReglement.getNumSinistre()).isEqualTo(DEFAULT_NUM_SINISTRE);
        assertThat(testMetaReglement.getNumContratLgbt()).isEqualTo(DEFAULT_NUM_CONTRAT_LGBT);
        assertThat(testMetaReglement.getNumSous()).isEqualTo(DEFAULT_NUM_SOUS);
    }

    @Test
    @Transactional
    public void createMetaReglementWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = metaReglementRepository.findAll().size();

        // Create the MetaReglement with an existing ID
        metaReglement.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMetaReglementMockMvc.perform(post("/api/meta-reglements")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(metaReglement)))
            .andExpect(status().isBadRequest());

        // Validate the MetaReglement in the database
        List<MetaReglement> metaReglementList = metaReglementRepository.findAll();
        assertThat(metaReglementList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllMetaReglements() throws Exception {
        // Initialize the database
        metaReglementRepository.saveAndFlush(metaReglement);

        // Get all the metaReglementList
        restMetaReglementMockMvc.perform(get("/api/meta-reglements?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(metaReglement.getId().intValue())))
            .andExpect(jsonPath("$.[*].idTech").value(hasItem(DEFAULT_ID_TECH.intValue())))
            .andExpect(jsonPath("$.[*].societe").value(hasItem(DEFAULT_SOCIETE)))
            .andExpect(jsonPath("$.[*].numSinistre").value(hasItem(DEFAULT_NUM_SINISTRE)))
            .andExpect(jsonPath("$.[*].numContratLgbt").value(hasItem(DEFAULT_NUM_CONTRAT_LGBT)))
            .andExpect(jsonPath("$.[*].numSous").value(hasItem(DEFAULT_NUM_SOUS)));
    }
    
    @Test
    @Transactional
    public void getMetaReglement() throws Exception {
        // Initialize the database
        metaReglementRepository.saveAndFlush(metaReglement);

        // Get the metaReglement
        restMetaReglementMockMvc.perform(get("/api/meta-reglements/{id}", metaReglement.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(metaReglement.getId().intValue()))
            .andExpect(jsonPath("$.idTech").value(DEFAULT_ID_TECH.intValue()))
            .andExpect(jsonPath("$.societe").value(DEFAULT_SOCIETE))
            .andExpect(jsonPath("$.numSinistre").value(DEFAULT_NUM_SINISTRE))
            .andExpect(jsonPath("$.numContratLgbt").value(DEFAULT_NUM_CONTRAT_LGBT))
            .andExpect(jsonPath("$.numSous").value(DEFAULT_NUM_SOUS));
    }

    @Test
    @Transactional
    public void getNonExistingMetaReglement() throws Exception {
        // Get the metaReglement
        restMetaReglementMockMvc.perform(get("/api/meta-reglements/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMetaReglement() throws Exception {
        // Initialize the database
        metaReglementRepository.saveAndFlush(metaReglement);

        int databaseSizeBeforeUpdate = metaReglementRepository.findAll().size();

        // Update the metaReglement
        MetaReglement updatedMetaReglement = metaReglementRepository.findById(metaReglement.getId()).get();
        // Disconnect from session so that the updates on updatedMetaReglement are not directly saved in db
        em.detach(updatedMetaReglement);
        updatedMetaReglement
            .idTech(UPDATED_ID_TECH)
            .societe(UPDATED_SOCIETE)
            .numSinistre(UPDATED_NUM_SINISTRE)
            .numContratLgbt(UPDATED_NUM_CONTRAT_LGBT)
            .numSous(UPDATED_NUM_SOUS);

        restMetaReglementMockMvc.perform(put("/api/meta-reglements")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedMetaReglement)))
            .andExpect(status().isOk());

        // Validate the MetaReglement in the database
        List<MetaReglement> metaReglementList = metaReglementRepository.findAll();
        assertThat(metaReglementList).hasSize(databaseSizeBeforeUpdate);
        MetaReglement testMetaReglement = metaReglementList.get(metaReglementList.size() - 1);
        assertThat(testMetaReglement.getIdTech()).isEqualTo(UPDATED_ID_TECH);
        assertThat(testMetaReglement.getSociete()).isEqualTo(UPDATED_SOCIETE);
        assertThat(testMetaReglement.getNumSinistre()).isEqualTo(UPDATED_NUM_SINISTRE);
        assertThat(testMetaReglement.getNumContratLgbt()).isEqualTo(UPDATED_NUM_CONTRAT_LGBT);
        assertThat(testMetaReglement.getNumSous()).isEqualTo(UPDATED_NUM_SOUS);
    }

    @Test
    @Transactional
    public void updateNonExistingMetaReglement() throws Exception {
        int databaseSizeBeforeUpdate = metaReglementRepository.findAll().size();

        // Create the MetaReglement

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMetaReglementMockMvc.perform(put("/api/meta-reglements")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(metaReglement)))
            .andExpect(status().isBadRequest());

        // Validate the MetaReglement in the database
        List<MetaReglement> metaReglementList = metaReglementRepository.findAll();
        assertThat(metaReglementList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMetaReglement() throws Exception {
        // Initialize the database
        metaReglementRepository.saveAndFlush(metaReglement);

        int databaseSizeBeforeDelete = metaReglementRepository.findAll().size();

        // Delete the metaReglement
        restMetaReglementMockMvc.perform(delete("/api/meta-reglements/{id}", metaReglement.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MetaReglement> metaReglementList = metaReglementRepository.findAll();
        assertThat(metaReglementList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
