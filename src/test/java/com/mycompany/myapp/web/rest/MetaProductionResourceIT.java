package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.PnApplicationApp;
import com.mycompany.myapp.domain.MetaProduction;
import com.mycompany.myapp.repository.MetaProductionRepository;

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
 * Integration tests for the {@link MetaProductionResource} REST controller.
 */
@SpringBootTest(classes = PnApplicationApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class MetaProductionResourceIT {

    private static final Long DEFAULT_ID_TECH = 1L;
    private static final Long UPDATED_ID_TECH = 2L;

    private static final String DEFAULT_SOCIETE = "AAAAAAAAAA";
    private static final String UPDATED_SOCIETE = "BBBBBBBBBB";

    private static final String DEFAULT_NUM_CONTRAT_LGBT = "AAAAAAAAAA";
    private static final String UPDATED_NUM_CONTRAT_LGBT = "BBBBBBBBBB";

    private static final String DEFAULT_NUM_SOUS = "AAAAAAAAAA";
    private static final String UPDATED_NUM_SOUS = "BBBBBBBBBB";

    @Autowired
    private MetaProductionRepository metaProductionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMetaProductionMockMvc;

    private MetaProduction metaProduction;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MetaProduction createEntity(EntityManager em) {
        MetaProduction metaProduction = new MetaProduction()
            .idTech(DEFAULT_ID_TECH)
            .societe(DEFAULT_SOCIETE)
            .numContratLgbt(DEFAULT_NUM_CONTRAT_LGBT)
            .numSous(DEFAULT_NUM_SOUS);
        return metaProduction;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MetaProduction createUpdatedEntity(EntityManager em) {
        MetaProduction metaProduction = new MetaProduction()
            .idTech(UPDATED_ID_TECH)
            .societe(UPDATED_SOCIETE)
            .numContratLgbt(UPDATED_NUM_CONTRAT_LGBT)
            .numSous(UPDATED_NUM_SOUS);
        return metaProduction;
    }

    @BeforeEach
    public void initTest() {
        metaProduction = createEntity(em);
    }

    @Test
    @Transactional
    public void createMetaProduction() throws Exception {
        int databaseSizeBeforeCreate = metaProductionRepository.findAll().size();

        // Create the MetaProduction
        restMetaProductionMockMvc.perform(post("/api/meta-productions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(metaProduction)))
            .andExpect(status().isCreated());

        // Validate the MetaProduction in the database
        List<MetaProduction> metaProductionList = metaProductionRepository.findAll();
        assertThat(metaProductionList).hasSize(databaseSizeBeforeCreate + 1);
        MetaProduction testMetaProduction = metaProductionList.get(metaProductionList.size() - 1);
        assertThat(testMetaProduction.getIdTech()).isEqualTo(DEFAULT_ID_TECH);
        assertThat(testMetaProduction.getSociete()).isEqualTo(DEFAULT_SOCIETE);
        assertThat(testMetaProduction.getNumContratLgbt()).isEqualTo(DEFAULT_NUM_CONTRAT_LGBT);
        assertThat(testMetaProduction.getNumSous()).isEqualTo(DEFAULT_NUM_SOUS);
    }

    @Test
    @Transactional
    public void createMetaProductionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = metaProductionRepository.findAll().size();

        // Create the MetaProduction with an existing ID
        metaProduction.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMetaProductionMockMvc.perform(post("/api/meta-productions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(metaProduction)))
            .andExpect(status().isBadRequest());

        // Validate the MetaProduction in the database
        List<MetaProduction> metaProductionList = metaProductionRepository.findAll();
        assertThat(metaProductionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllMetaProductions() throws Exception {
        // Initialize the database
        metaProductionRepository.saveAndFlush(metaProduction);

        // Get all the metaProductionList
        restMetaProductionMockMvc.perform(get("/api/meta-productions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(metaProduction.getId().intValue())))
            .andExpect(jsonPath("$.[*].idTech").value(hasItem(DEFAULT_ID_TECH.intValue())))
            .andExpect(jsonPath("$.[*].societe").value(hasItem(DEFAULT_SOCIETE)))
            .andExpect(jsonPath("$.[*].numContratLgbt").value(hasItem(DEFAULT_NUM_CONTRAT_LGBT)))
            .andExpect(jsonPath("$.[*].numSous").value(hasItem(DEFAULT_NUM_SOUS)));
    }
    
    @Test
    @Transactional
    public void getMetaProduction() throws Exception {
        // Initialize the database
        metaProductionRepository.saveAndFlush(metaProduction);

        // Get the metaProduction
        restMetaProductionMockMvc.perform(get("/api/meta-productions/{id}", metaProduction.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(metaProduction.getId().intValue()))
            .andExpect(jsonPath("$.idTech").value(DEFAULT_ID_TECH.intValue()))
            .andExpect(jsonPath("$.societe").value(DEFAULT_SOCIETE))
            .andExpect(jsonPath("$.numContratLgbt").value(DEFAULT_NUM_CONTRAT_LGBT))
            .andExpect(jsonPath("$.numSous").value(DEFAULT_NUM_SOUS));
    }

    @Test
    @Transactional
    public void getNonExistingMetaProduction() throws Exception {
        // Get the metaProduction
        restMetaProductionMockMvc.perform(get("/api/meta-productions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMetaProduction() throws Exception {
        // Initialize the database
        metaProductionRepository.saveAndFlush(metaProduction);

        int databaseSizeBeforeUpdate = metaProductionRepository.findAll().size();

        // Update the metaProduction
        MetaProduction updatedMetaProduction = metaProductionRepository.findById(metaProduction.getId()).get();
        // Disconnect from session so that the updates on updatedMetaProduction are not directly saved in db
        em.detach(updatedMetaProduction);
        updatedMetaProduction
            .idTech(UPDATED_ID_TECH)
            .societe(UPDATED_SOCIETE)
            .numContratLgbt(UPDATED_NUM_CONTRAT_LGBT)
            .numSous(UPDATED_NUM_SOUS);

        restMetaProductionMockMvc.perform(put("/api/meta-productions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedMetaProduction)))
            .andExpect(status().isOk());

        // Validate the MetaProduction in the database
        List<MetaProduction> metaProductionList = metaProductionRepository.findAll();
        assertThat(metaProductionList).hasSize(databaseSizeBeforeUpdate);
        MetaProduction testMetaProduction = metaProductionList.get(metaProductionList.size() - 1);
        assertThat(testMetaProduction.getIdTech()).isEqualTo(UPDATED_ID_TECH);
        assertThat(testMetaProduction.getSociete()).isEqualTo(UPDATED_SOCIETE);
        assertThat(testMetaProduction.getNumContratLgbt()).isEqualTo(UPDATED_NUM_CONTRAT_LGBT);
        assertThat(testMetaProduction.getNumSous()).isEqualTo(UPDATED_NUM_SOUS);
    }

    @Test
    @Transactional
    public void updateNonExistingMetaProduction() throws Exception {
        int databaseSizeBeforeUpdate = metaProductionRepository.findAll().size();

        // Create the MetaProduction

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMetaProductionMockMvc.perform(put("/api/meta-productions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(metaProduction)))
            .andExpect(status().isBadRequest());

        // Validate the MetaProduction in the database
        List<MetaProduction> metaProductionList = metaProductionRepository.findAll();
        assertThat(metaProductionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMetaProduction() throws Exception {
        // Initialize the database
        metaProductionRepository.saveAndFlush(metaProduction);

        int databaseSizeBeforeDelete = metaProductionRepository.findAll().size();

        // Delete the metaProduction
        restMetaProductionMockMvc.perform(delete("/api/meta-productions/{id}", metaProduction.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MetaProduction> metaProductionList = metaProductionRepository.findAll();
        assertThat(metaProductionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
