package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.PnApplicationApp;
import com.mycompany.myapp.domain.MetaCoheris;
import com.mycompany.myapp.repository.MetaCoherisRepository;

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
 * Integration tests for the {@link MetaCoherisResource} REST controller.
 */
@SpringBootTest(classes = PnApplicationApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class MetaCoherisResourceIT {

    private static final Long DEFAULT_ID_TECH = 1L;
    private static final Long UPDATED_ID_TECH = 2L;

    private static final String DEFAULT_SOCIETE = "AAAAAAAAAA";
    private static final String UPDATED_SOCIETE = "BBBBBBBBBB";

    private static final String DEFAULT_NUM_SOUS = "AAAAAAAAAA";
    private static final String UPDATED_NUM_SOUS = "BBBBBBBBBB";

    private static final String DEFAULT_NUM_GRC = "AAAAAAAAAA";
    private static final String UPDATED_NUM_GRC = "BBBBBBBBBB";

    @Autowired
    private MetaCoherisRepository metaCoherisRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMetaCoherisMockMvc;

    private MetaCoheris metaCoheris;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MetaCoheris createEntity(EntityManager em) {
        MetaCoheris metaCoheris = new MetaCoheris()
            .idTech(DEFAULT_ID_TECH)
            .societe(DEFAULT_SOCIETE)
            .numSous(DEFAULT_NUM_SOUS)
            .numGRC(DEFAULT_NUM_GRC);
        return metaCoheris;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MetaCoheris createUpdatedEntity(EntityManager em) {
        MetaCoheris metaCoheris = new MetaCoheris()
            .idTech(UPDATED_ID_TECH)
            .societe(UPDATED_SOCIETE)
            .numSous(UPDATED_NUM_SOUS)
            .numGRC(UPDATED_NUM_GRC);
        return metaCoheris;
    }

    @BeforeEach
    public void initTest() {
        metaCoheris = createEntity(em);
    }

    @Test
    @Transactional
    public void createMetaCoheris() throws Exception {
        int databaseSizeBeforeCreate = metaCoherisRepository.findAll().size();

        // Create the MetaCoheris
        restMetaCoherisMockMvc.perform(post("/api/meta-coherises")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(metaCoheris)))
            .andExpect(status().isCreated());

        // Validate the MetaCoheris in the database
        List<MetaCoheris> metaCoherisList = metaCoherisRepository.findAll();
        assertThat(metaCoherisList).hasSize(databaseSizeBeforeCreate + 1);
        MetaCoheris testMetaCoheris = metaCoherisList.get(metaCoherisList.size() - 1);
        assertThat(testMetaCoheris.getIdTech()).isEqualTo(DEFAULT_ID_TECH);
        assertThat(testMetaCoheris.getSociete()).isEqualTo(DEFAULT_SOCIETE);
        assertThat(testMetaCoheris.getNumSous()).isEqualTo(DEFAULT_NUM_SOUS);
        assertThat(testMetaCoheris.getNumGRC()).isEqualTo(DEFAULT_NUM_GRC);
    }

    @Test
    @Transactional
    public void createMetaCoherisWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = metaCoherisRepository.findAll().size();

        // Create the MetaCoheris with an existing ID
        metaCoheris.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMetaCoherisMockMvc.perform(post("/api/meta-coherises")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(metaCoheris)))
            .andExpect(status().isBadRequest());

        // Validate the MetaCoheris in the database
        List<MetaCoheris> metaCoherisList = metaCoherisRepository.findAll();
        assertThat(metaCoherisList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllMetaCoherises() throws Exception {
        // Initialize the database
        metaCoherisRepository.saveAndFlush(metaCoheris);

        // Get all the metaCoherisList
        restMetaCoherisMockMvc.perform(get("/api/meta-coherises?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(metaCoheris.getId().intValue())))
            .andExpect(jsonPath("$.[*].idTech").value(hasItem(DEFAULT_ID_TECH.intValue())))
            .andExpect(jsonPath("$.[*].societe").value(hasItem(DEFAULT_SOCIETE)))
            .andExpect(jsonPath("$.[*].numSous").value(hasItem(DEFAULT_NUM_SOUS)))
            .andExpect(jsonPath("$.[*].numGRC").value(hasItem(DEFAULT_NUM_GRC)));
    }
    
    @Test
    @Transactional
    public void getMetaCoheris() throws Exception {
        // Initialize the database
        metaCoherisRepository.saveAndFlush(metaCoheris);

        // Get the metaCoheris
        restMetaCoherisMockMvc.perform(get("/api/meta-coherises/{id}", metaCoheris.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(metaCoheris.getId().intValue()))
            .andExpect(jsonPath("$.idTech").value(DEFAULT_ID_TECH.intValue()))
            .andExpect(jsonPath("$.societe").value(DEFAULT_SOCIETE))
            .andExpect(jsonPath("$.numSous").value(DEFAULT_NUM_SOUS))
            .andExpect(jsonPath("$.numGRC").value(DEFAULT_NUM_GRC));
    }

    @Test
    @Transactional
    public void getNonExistingMetaCoheris() throws Exception {
        // Get the metaCoheris
        restMetaCoherisMockMvc.perform(get("/api/meta-coherises/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMetaCoheris() throws Exception {
        // Initialize the database
        metaCoherisRepository.saveAndFlush(metaCoheris);

        int databaseSizeBeforeUpdate = metaCoherisRepository.findAll().size();

        // Update the metaCoheris
        MetaCoheris updatedMetaCoheris = metaCoherisRepository.findById(metaCoheris.getId()).get();
        // Disconnect from session so that the updates on updatedMetaCoheris are not directly saved in db
        em.detach(updatedMetaCoheris);
        updatedMetaCoheris
            .idTech(UPDATED_ID_TECH)
            .societe(UPDATED_SOCIETE)
            .numSous(UPDATED_NUM_SOUS)
            .numGRC(UPDATED_NUM_GRC);

        restMetaCoherisMockMvc.perform(put("/api/meta-coherises")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedMetaCoheris)))
            .andExpect(status().isOk());

        // Validate the MetaCoheris in the database
        List<MetaCoheris> metaCoherisList = metaCoherisRepository.findAll();
        assertThat(metaCoherisList).hasSize(databaseSizeBeforeUpdate);
        MetaCoheris testMetaCoheris = metaCoherisList.get(metaCoherisList.size() - 1);
        assertThat(testMetaCoheris.getIdTech()).isEqualTo(UPDATED_ID_TECH);
        assertThat(testMetaCoheris.getSociete()).isEqualTo(UPDATED_SOCIETE);
        assertThat(testMetaCoheris.getNumSous()).isEqualTo(UPDATED_NUM_SOUS);
        assertThat(testMetaCoheris.getNumGRC()).isEqualTo(UPDATED_NUM_GRC);
    }

    @Test
    @Transactional
    public void updateNonExistingMetaCoheris() throws Exception {
        int databaseSizeBeforeUpdate = metaCoherisRepository.findAll().size();

        // Create the MetaCoheris

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMetaCoherisMockMvc.perform(put("/api/meta-coherises")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(metaCoheris)))
            .andExpect(status().isBadRequest());

        // Validate the MetaCoheris in the database
        List<MetaCoheris> metaCoherisList = metaCoherisRepository.findAll();
        assertThat(metaCoherisList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMetaCoheris() throws Exception {
        // Initialize the database
        metaCoherisRepository.saveAndFlush(metaCoheris);

        int databaseSizeBeforeDelete = metaCoherisRepository.findAll().size();

        // Delete the metaCoheris
        restMetaCoherisMockMvc.perform(delete("/api/meta-coherises/{id}", metaCoheris.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MetaCoheris> metaCoherisList = metaCoherisRepository.findAll();
        assertThat(metaCoherisList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
