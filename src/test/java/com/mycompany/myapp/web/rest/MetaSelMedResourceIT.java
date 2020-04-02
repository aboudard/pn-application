package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.PnApplicationApp;
import com.mycompany.myapp.domain.MetaSelMed;
import com.mycompany.myapp.repository.MetaSelMedRepository;

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
 * Integration tests for the {@link MetaSelMedResource} REST controller.
 */
@SpringBootTest(classes = PnApplicationApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class MetaSelMedResourceIT {

    private static final Long DEFAULT_ID_TECH = 1L;
    private static final Long UPDATED_ID_TECH = 2L;

    private static final String DEFAULT_NUM_SOUS = "AAAAAAAAAA";
    private static final String UPDATED_NUM_SOUS = "BBBBBBBBBB";

    private static final String DEFAULT_NUM_DOSSIER = "AAAAAAAAAA";
    private static final String UPDATED_NUM_DOSSIER = "BBBBBBBBBB";

    private static final String DEFAULT_NOM_ASSURE = "AAAAAAAAAA";
    private static final String UPDATED_NOM_ASSURE = "BBBBBBBBBB";

    @Autowired
    private MetaSelMedRepository metaSelMedRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMetaSelMedMockMvc;

    private MetaSelMed metaSelMed;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MetaSelMed createEntity(EntityManager em) {
        MetaSelMed metaSelMed = new MetaSelMed()
            .idTech(DEFAULT_ID_TECH)
            .numSous(DEFAULT_NUM_SOUS)
            .numDossier(DEFAULT_NUM_DOSSIER)
            .nomAssure(DEFAULT_NOM_ASSURE);
        return metaSelMed;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MetaSelMed createUpdatedEntity(EntityManager em) {
        MetaSelMed metaSelMed = new MetaSelMed()
            .idTech(UPDATED_ID_TECH)
            .numSous(UPDATED_NUM_SOUS)
            .numDossier(UPDATED_NUM_DOSSIER)
            .nomAssure(UPDATED_NOM_ASSURE);
        return metaSelMed;
    }

    @BeforeEach
    public void initTest() {
        metaSelMed = createEntity(em);
    }

    @Test
    @Transactional
    public void createMetaSelMed() throws Exception {
        int databaseSizeBeforeCreate = metaSelMedRepository.findAll().size();

        // Create the MetaSelMed
        restMetaSelMedMockMvc.perform(post("/api/meta-sel-meds")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(metaSelMed)))
            .andExpect(status().isCreated());

        // Validate the MetaSelMed in the database
        List<MetaSelMed> metaSelMedList = metaSelMedRepository.findAll();
        assertThat(metaSelMedList).hasSize(databaseSizeBeforeCreate + 1);
        MetaSelMed testMetaSelMed = metaSelMedList.get(metaSelMedList.size() - 1);
        assertThat(testMetaSelMed.getIdTech()).isEqualTo(DEFAULT_ID_TECH);
        assertThat(testMetaSelMed.getNumSous()).isEqualTo(DEFAULT_NUM_SOUS);
        assertThat(testMetaSelMed.getNumDossier()).isEqualTo(DEFAULT_NUM_DOSSIER);
        assertThat(testMetaSelMed.getNomAssure()).isEqualTo(DEFAULT_NOM_ASSURE);
    }

    @Test
    @Transactional
    public void createMetaSelMedWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = metaSelMedRepository.findAll().size();

        // Create the MetaSelMed with an existing ID
        metaSelMed.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMetaSelMedMockMvc.perform(post("/api/meta-sel-meds")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(metaSelMed)))
            .andExpect(status().isBadRequest());

        // Validate the MetaSelMed in the database
        List<MetaSelMed> metaSelMedList = metaSelMedRepository.findAll();
        assertThat(metaSelMedList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllMetaSelMeds() throws Exception {
        // Initialize the database
        metaSelMedRepository.saveAndFlush(metaSelMed);

        // Get all the metaSelMedList
        restMetaSelMedMockMvc.perform(get("/api/meta-sel-meds?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(metaSelMed.getId().intValue())))
            .andExpect(jsonPath("$.[*].idTech").value(hasItem(DEFAULT_ID_TECH.intValue())))
            .andExpect(jsonPath("$.[*].numSous").value(hasItem(DEFAULT_NUM_SOUS)))
            .andExpect(jsonPath("$.[*].numDossier").value(hasItem(DEFAULT_NUM_DOSSIER)))
            .andExpect(jsonPath("$.[*].nomAssure").value(hasItem(DEFAULT_NOM_ASSURE)));
    }
    
    @Test
    @Transactional
    public void getMetaSelMed() throws Exception {
        // Initialize the database
        metaSelMedRepository.saveAndFlush(metaSelMed);

        // Get the metaSelMed
        restMetaSelMedMockMvc.perform(get("/api/meta-sel-meds/{id}", metaSelMed.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(metaSelMed.getId().intValue()))
            .andExpect(jsonPath("$.idTech").value(DEFAULT_ID_TECH.intValue()))
            .andExpect(jsonPath("$.numSous").value(DEFAULT_NUM_SOUS))
            .andExpect(jsonPath("$.numDossier").value(DEFAULT_NUM_DOSSIER))
            .andExpect(jsonPath("$.nomAssure").value(DEFAULT_NOM_ASSURE));
    }

    @Test
    @Transactional
    public void getNonExistingMetaSelMed() throws Exception {
        // Get the metaSelMed
        restMetaSelMedMockMvc.perform(get("/api/meta-sel-meds/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMetaSelMed() throws Exception {
        // Initialize the database
        metaSelMedRepository.saveAndFlush(metaSelMed);

        int databaseSizeBeforeUpdate = metaSelMedRepository.findAll().size();

        // Update the metaSelMed
        MetaSelMed updatedMetaSelMed = metaSelMedRepository.findById(metaSelMed.getId()).get();
        // Disconnect from session so that the updates on updatedMetaSelMed are not directly saved in db
        em.detach(updatedMetaSelMed);
        updatedMetaSelMed
            .idTech(UPDATED_ID_TECH)
            .numSous(UPDATED_NUM_SOUS)
            .numDossier(UPDATED_NUM_DOSSIER)
            .nomAssure(UPDATED_NOM_ASSURE);

        restMetaSelMedMockMvc.perform(put("/api/meta-sel-meds")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedMetaSelMed)))
            .andExpect(status().isOk());

        // Validate the MetaSelMed in the database
        List<MetaSelMed> metaSelMedList = metaSelMedRepository.findAll();
        assertThat(metaSelMedList).hasSize(databaseSizeBeforeUpdate);
        MetaSelMed testMetaSelMed = metaSelMedList.get(metaSelMedList.size() - 1);
        assertThat(testMetaSelMed.getIdTech()).isEqualTo(UPDATED_ID_TECH);
        assertThat(testMetaSelMed.getNumSous()).isEqualTo(UPDATED_NUM_SOUS);
        assertThat(testMetaSelMed.getNumDossier()).isEqualTo(UPDATED_NUM_DOSSIER);
        assertThat(testMetaSelMed.getNomAssure()).isEqualTo(UPDATED_NOM_ASSURE);
    }

    @Test
    @Transactional
    public void updateNonExistingMetaSelMed() throws Exception {
        int databaseSizeBeforeUpdate = metaSelMedRepository.findAll().size();

        // Create the MetaSelMed

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMetaSelMedMockMvc.perform(put("/api/meta-sel-meds")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(metaSelMed)))
            .andExpect(status().isBadRequest());

        // Validate the MetaSelMed in the database
        List<MetaSelMed> metaSelMedList = metaSelMedRepository.findAll();
        assertThat(metaSelMedList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMetaSelMed() throws Exception {
        // Initialize the database
        metaSelMedRepository.saveAndFlush(metaSelMed);

        int databaseSizeBeforeDelete = metaSelMedRepository.findAll().size();

        // Delete the metaSelMed
        restMetaSelMedMockMvc.perform(delete("/api/meta-sel-meds/{id}", metaSelMed.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MetaSelMed> metaSelMedList = metaSelMedRepository.findAll();
        assertThat(metaSelMedList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
