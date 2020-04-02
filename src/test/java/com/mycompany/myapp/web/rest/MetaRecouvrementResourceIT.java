package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.PnApplicationApp;
import com.mycompany.myapp.domain.MetaRecouvrement;
import com.mycompany.myapp.repository.MetaRecouvrementRepository;

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
 * Integration tests for the {@link MetaRecouvrementResource} REST controller.
 */
@SpringBootTest(classes = PnApplicationApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class MetaRecouvrementResourceIT {

    private static final Long DEFAULT_ID_TECH = 1L;
    private static final Long UPDATED_ID_TECH = 2L;

    private static final String DEFAULT_SOCIETE = "AAAAAAAAAA";
    private static final String UPDATED_SOCIETE = "BBBBBBBBBB";

    private static final String DEFAULT_NUM_SOUS = "AAAAAAAAAA";
    private static final String UPDATED_NUM_SOUS = "BBBBBBBBBB";

    @Autowired
    private MetaRecouvrementRepository metaRecouvrementRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMetaRecouvrementMockMvc;

    private MetaRecouvrement metaRecouvrement;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MetaRecouvrement createEntity(EntityManager em) {
        MetaRecouvrement metaRecouvrement = new MetaRecouvrement()
            .idTech(DEFAULT_ID_TECH)
            .societe(DEFAULT_SOCIETE)
            .numSous(DEFAULT_NUM_SOUS);
        return metaRecouvrement;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MetaRecouvrement createUpdatedEntity(EntityManager em) {
        MetaRecouvrement metaRecouvrement = new MetaRecouvrement()
            .idTech(UPDATED_ID_TECH)
            .societe(UPDATED_SOCIETE)
            .numSous(UPDATED_NUM_SOUS);
        return metaRecouvrement;
    }

    @BeforeEach
    public void initTest() {
        metaRecouvrement = createEntity(em);
    }

    @Test
    @Transactional
    public void createMetaRecouvrement() throws Exception {
        int databaseSizeBeforeCreate = metaRecouvrementRepository.findAll().size();

        // Create the MetaRecouvrement
        restMetaRecouvrementMockMvc.perform(post("/api/meta-recouvrements")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(metaRecouvrement)))
            .andExpect(status().isCreated());

        // Validate the MetaRecouvrement in the database
        List<MetaRecouvrement> metaRecouvrementList = metaRecouvrementRepository.findAll();
        assertThat(metaRecouvrementList).hasSize(databaseSizeBeforeCreate + 1);
        MetaRecouvrement testMetaRecouvrement = metaRecouvrementList.get(metaRecouvrementList.size() - 1);
        assertThat(testMetaRecouvrement.getIdTech()).isEqualTo(DEFAULT_ID_TECH);
        assertThat(testMetaRecouvrement.getSociete()).isEqualTo(DEFAULT_SOCIETE);
        assertThat(testMetaRecouvrement.getNumSous()).isEqualTo(DEFAULT_NUM_SOUS);
    }

    @Test
    @Transactional
    public void createMetaRecouvrementWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = metaRecouvrementRepository.findAll().size();

        // Create the MetaRecouvrement with an existing ID
        metaRecouvrement.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMetaRecouvrementMockMvc.perform(post("/api/meta-recouvrements")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(metaRecouvrement)))
            .andExpect(status().isBadRequest());

        // Validate the MetaRecouvrement in the database
        List<MetaRecouvrement> metaRecouvrementList = metaRecouvrementRepository.findAll();
        assertThat(metaRecouvrementList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllMetaRecouvrements() throws Exception {
        // Initialize the database
        metaRecouvrementRepository.saveAndFlush(metaRecouvrement);

        // Get all the metaRecouvrementList
        restMetaRecouvrementMockMvc.perform(get("/api/meta-recouvrements?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(metaRecouvrement.getId().intValue())))
            .andExpect(jsonPath("$.[*].idTech").value(hasItem(DEFAULT_ID_TECH.intValue())))
            .andExpect(jsonPath("$.[*].societe").value(hasItem(DEFAULT_SOCIETE)))
            .andExpect(jsonPath("$.[*].numSous").value(hasItem(DEFAULT_NUM_SOUS)));
    }
    
    @Test
    @Transactional
    public void getMetaRecouvrement() throws Exception {
        // Initialize the database
        metaRecouvrementRepository.saveAndFlush(metaRecouvrement);

        // Get the metaRecouvrement
        restMetaRecouvrementMockMvc.perform(get("/api/meta-recouvrements/{id}", metaRecouvrement.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(metaRecouvrement.getId().intValue()))
            .andExpect(jsonPath("$.idTech").value(DEFAULT_ID_TECH.intValue()))
            .andExpect(jsonPath("$.societe").value(DEFAULT_SOCIETE))
            .andExpect(jsonPath("$.numSous").value(DEFAULT_NUM_SOUS));
    }

    @Test
    @Transactional
    public void getNonExistingMetaRecouvrement() throws Exception {
        // Get the metaRecouvrement
        restMetaRecouvrementMockMvc.perform(get("/api/meta-recouvrements/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMetaRecouvrement() throws Exception {
        // Initialize the database
        metaRecouvrementRepository.saveAndFlush(metaRecouvrement);

        int databaseSizeBeforeUpdate = metaRecouvrementRepository.findAll().size();

        // Update the metaRecouvrement
        MetaRecouvrement updatedMetaRecouvrement = metaRecouvrementRepository.findById(metaRecouvrement.getId()).get();
        // Disconnect from session so that the updates on updatedMetaRecouvrement are not directly saved in db
        em.detach(updatedMetaRecouvrement);
        updatedMetaRecouvrement
            .idTech(UPDATED_ID_TECH)
            .societe(UPDATED_SOCIETE)
            .numSous(UPDATED_NUM_SOUS);

        restMetaRecouvrementMockMvc.perform(put("/api/meta-recouvrements")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedMetaRecouvrement)))
            .andExpect(status().isOk());

        // Validate the MetaRecouvrement in the database
        List<MetaRecouvrement> metaRecouvrementList = metaRecouvrementRepository.findAll();
        assertThat(metaRecouvrementList).hasSize(databaseSizeBeforeUpdate);
        MetaRecouvrement testMetaRecouvrement = metaRecouvrementList.get(metaRecouvrementList.size() - 1);
        assertThat(testMetaRecouvrement.getIdTech()).isEqualTo(UPDATED_ID_TECH);
        assertThat(testMetaRecouvrement.getSociete()).isEqualTo(UPDATED_SOCIETE);
        assertThat(testMetaRecouvrement.getNumSous()).isEqualTo(UPDATED_NUM_SOUS);
    }

    @Test
    @Transactional
    public void updateNonExistingMetaRecouvrement() throws Exception {
        int databaseSizeBeforeUpdate = metaRecouvrementRepository.findAll().size();

        // Create the MetaRecouvrement

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMetaRecouvrementMockMvc.perform(put("/api/meta-recouvrements")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(metaRecouvrement)))
            .andExpect(status().isBadRequest());

        // Validate the MetaRecouvrement in the database
        List<MetaRecouvrement> metaRecouvrementList = metaRecouvrementRepository.findAll();
        assertThat(metaRecouvrementList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMetaRecouvrement() throws Exception {
        // Initialize the database
        metaRecouvrementRepository.saveAndFlush(metaRecouvrement);

        int databaseSizeBeforeDelete = metaRecouvrementRepository.findAll().size();

        // Delete the metaRecouvrement
        restMetaRecouvrementMockMvc.perform(delete("/api/meta-recouvrements/{id}", metaRecouvrement.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MetaRecouvrement> metaRecouvrementList = metaRecouvrementRepository.findAll();
        assertThat(metaRecouvrementList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
