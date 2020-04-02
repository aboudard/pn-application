package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.PnApplicationApp;
import com.mycompany.myapp.domain.MetaVie;
import com.mycompany.myapp.repository.MetaVieRepository;

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
 * Integration tests for the {@link MetaVieResource} REST controller.
 */
@SpringBootTest(classes = PnApplicationApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class MetaVieResourceIT {

    private static final Long DEFAULT_ID_TECH = 1L;
    private static final Long UPDATED_ID_TECH = 2L;

    private static final String DEFAULT_NUM_SOUS = "AAAAAAAAAA";
    private static final String UPDATED_NUM_SOUS = "BBBBBBBBBB";

    private static final String DEFAULT_NUM_CONTRAT_VIE = "AAAAAAAAAA";
    private static final String UPDATED_NUM_CONTRAT_VIE = "BBBBBBBBBB";

    @Autowired
    private MetaVieRepository metaVieRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMetaVieMockMvc;

    private MetaVie metaVie;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MetaVie createEntity(EntityManager em) {
        MetaVie metaVie = new MetaVie()
            .idTech(DEFAULT_ID_TECH)
            .numSous(DEFAULT_NUM_SOUS)
            .numContratVie(DEFAULT_NUM_CONTRAT_VIE);
        return metaVie;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MetaVie createUpdatedEntity(EntityManager em) {
        MetaVie metaVie = new MetaVie()
            .idTech(UPDATED_ID_TECH)
            .numSous(UPDATED_NUM_SOUS)
            .numContratVie(UPDATED_NUM_CONTRAT_VIE);
        return metaVie;
    }

    @BeforeEach
    public void initTest() {
        metaVie = createEntity(em);
    }

    @Test
    @Transactional
    public void createMetaVie() throws Exception {
        int databaseSizeBeforeCreate = metaVieRepository.findAll().size();

        // Create the MetaVie
        restMetaVieMockMvc.perform(post("/api/meta-vies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(metaVie)))
            .andExpect(status().isCreated());

        // Validate the MetaVie in the database
        List<MetaVie> metaVieList = metaVieRepository.findAll();
        assertThat(metaVieList).hasSize(databaseSizeBeforeCreate + 1);
        MetaVie testMetaVie = metaVieList.get(metaVieList.size() - 1);
        assertThat(testMetaVie.getIdTech()).isEqualTo(DEFAULT_ID_TECH);
        assertThat(testMetaVie.getNumSous()).isEqualTo(DEFAULT_NUM_SOUS);
        assertThat(testMetaVie.getNumContratVie()).isEqualTo(DEFAULT_NUM_CONTRAT_VIE);
    }

    @Test
    @Transactional
    public void createMetaVieWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = metaVieRepository.findAll().size();

        // Create the MetaVie with an existing ID
        metaVie.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMetaVieMockMvc.perform(post("/api/meta-vies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(metaVie)))
            .andExpect(status().isBadRequest());

        // Validate the MetaVie in the database
        List<MetaVie> metaVieList = metaVieRepository.findAll();
        assertThat(metaVieList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllMetaVies() throws Exception {
        // Initialize the database
        metaVieRepository.saveAndFlush(metaVie);

        // Get all the metaVieList
        restMetaVieMockMvc.perform(get("/api/meta-vies?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(metaVie.getId().intValue())))
            .andExpect(jsonPath("$.[*].idTech").value(hasItem(DEFAULT_ID_TECH.intValue())))
            .andExpect(jsonPath("$.[*].numSous").value(hasItem(DEFAULT_NUM_SOUS)))
            .andExpect(jsonPath("$.[*].numContratVie").value(hasItem(DEFAULT_NUM_CONTRAT_VIE)));
    }
    
    @Test
    @Transactional
    public void getMetaVie() throws Exception {
        // Initialize the database
        metaVieRepository.saveAndFlush(metaVie);

        // Get the metaVie
        restMetaVieMockMvc.perform(get("/api/meta-vies/{id}", metaVie.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(metaVie.getId().intValue()))
            .andExpect(jsonPath("$.idTech").value(DEFAULT_ID_TECH.intValue()))
            .andExpect(jsonPath("$.numSous").value(DEFAULT_NUM_SOUS))
            .andExpect(jsonPath("$.numContratVie").value(DEFAULT_NUM_CONTRAT_VIE));
    }

    @Test
    @Transactional
    public void getNonExistingMetaVie() throws Exception {
        // Get the metaVie
        restMetaVieMockMvc.perform(get("/api/meta-vies/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMetaVie() throws Exception {
        // Initialize the database
        metaVieRepository.saveAndFlush(metaVie);

        int databaseSizeBeforeUpdate = metaVieRepository.findAll().size();

        // Update the metaVie
        MetaVie updatedMetaVie = metaVieRepository.findById(metaVie.getId()).get();
        // Disconnect from session so that the updates on updatedMetaVie are not directly saved in db
        em.detach(updatedMetaVie);
        updatedMetaVie
            .idTech(UPDATED_ID_TECH)
            .numSous(UPDATED_NUM_SOUS)
            .numContratVie(UPDATED_NUM_CONTRAT_VIE);

        restMetaVieMockMvc.perform(put("/api/meta-vies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedMetaVie)))
            .andExpect(status().isOk());

        // Validate the MetaVie in the database
        List<MetaVie> metaVieList = metaVieRepository.findAll();
        assertThat(metaVieList).hasSize(databaseSizeBeforeUpdate);
        MetaVie testMetaVie = metaVieList.get(metaVieList.size() - 1);
        assertThat(testMetaVie.getIdTech()).isEqualTo(UPDATED_ID_TECH);
        assertThat(testMetaVie.getNumSous()).isEqualTo(UPDATED_NUM_SOUS);
        assertThat(testMetaVie.getNumContratVie()).isEqualTo(UPDATED_NUM_CONTRAT_VIE);
    }

    @Test
    @Transactional
    public void updateNonExistingMetaVie() throws Exception {
        int databaseSizeBeforeUpdate = metaVieRepository.findAll().size();

        // Create the MetaVie

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMetaVieMockMvc.perform(put("/api/meta-vies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(metaVie)))
            .andExpect(status().isBadRequest());

        // Validate the MetaVie in the database
        List<MetaVie> metaVieList = metaVieRepository.findAll();
        assertThat(metaVieList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMetaVie() throws Exception {
        // Initialize the database
        metaVieRepository.saveAndFlush(metaVie);

        int databaseSizeBeforeDelete = metaVieRepository.findAll().size();

        // Delete the metaVie
        restMetaVieMockMvc.perform(delete("/api/meta-vies/{id}", metaVie.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MetaVie> metaVieList = metaVieRepository.findAll();
        assertThat(metaVieList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
