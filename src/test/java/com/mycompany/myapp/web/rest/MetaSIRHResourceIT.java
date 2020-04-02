package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.PnApplicationApp;
import com.mycompany.myapp.domain.MetaSIRH;
import com.mycompany.myapp.repository.MetaSIRHRepository;

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
 * Integration tests for the {@link MetaSIRHResource} REST controller.
 */
@SpringBootTest(classes = PnApplicationApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class MetaSIRHResourceIT {

    private static final Long DEFAULT_ID_TECH = 1L;
    private static final Long UPDATED_ID_TECH = 2L;

    private static final String DEFAULT_NUM_BADGE = "AAAAAAAAAA";
    private static final String UPDATED_NUM_BADGE = "BBBBBBBBBB";

    private static final String DEFAULT_NUM_BADGE_DEST = "AAAAAAAAAA";
    private static final String UPDATED_NUM_BADGE_DEST = "BBBBBBBBBB";

    private static final String DEFAULT_NOM_COLLAB = "AAAAAAAAAA";
    private static final String UPDATED_NOM_COLLAB = "BBBBBBBBBB";

    private static final String DEFAULT_PRENOM_COLLAB = "AAAAAAAAAA";
    private static final String UPDATED_PRENOM_COLLAB = "BBBBBBBBBB";

    private static final String DEFAULT_CODE_UO = "AAAAAAAAAA";
    private static final String UPDATED_CODE_UO = "BBBBBBBBBB";

    @Autowired
    private MetaSIRHRepository metaSIRHRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMetaSIRHMockMvc;

    private MetaSIRH metaSIRH;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MetaSIRH createEntity(EntityManager em) {
        MetaSIRH metaSIRH = new MetaSIRH()
            .idTech(DEFAULT_ID_TECH)
            .numBadge(DEFAULT_NUM_BADGE)
            .numBadgeDest(DEFAULT_NUM_BADGE_DEST)
            .nomCollab(DEFAULT_NOM_COLLAB)
            .prenomCollab(DEFAULT_PRENOM_COLLAB)
            .codeUO(DEFAULT_CODE_UO);
        return metaSIRH;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MetaSIRH createUpdatedEntity(EntityManager em) {
        MetaSIRH metaSIRH = new MetaSIRH()
            .idTech(UPDATED_ID_TECH)
            .numBadge(UPDATED_NUM_BADGE)
            .numBadgeDest(UPDATED_NUM_BADGE_DEST)
            .nomCollab(UPDATED_NOM_COLLAB)
            .prenomCollab(UPDATED_PRENOM_COLLAB)
            .codeUO(UPDATED_CODE_UO);
        return metaSIRH;
    }

    @BeforeEach
    public void initTest() {
        metaSIRH = createEntity(em);
    }

    @Test
    @Transactional
    public void createMetaSIRH() throws Exception {
        int databaseSizeBeforeCreate = metaSIRHRepository.findAll().size();

        // Create the MetaSIRH
        restMetaSIRHMockMvc.perform(post("/api/meta-sirhs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(metaSIRH)))
            .andExpect(status().isCreated());

        // Validate the MetaSIRH in the database
        List<MetaSIRH> metaSIRHList = metaSIRHRepository.findAll();
        assertThat(metaSIRHList).hasSize(databaseSizeBeforeCreate + 1);
        MetaSIRH testMetaSIRH = metaSIRHList.get(metaSIRHList.size() - 1);
        assertThat(testMetaSIRH.getIdTech()).isEqualTo(DEFAULT_ID_TECH);
        assertThat(testMetaSIRH.getNumBadge()).isEqualTo(DEFAULT_NUM_BADGE);
        assertThat(testMetaSIRH.getNumBadgeDest()).isEqualTo(DEFAULT_NUM_BADGE_DEST);
        assertThat(testMetaSIRH.getNomCollab()).isEqualTo(DEFAULT_NOM_COLLAB);
        assertThat(testMetaSIRH.getPrenomCollab()).isEqualTo(DEFAULT_PRENOM_COLLAB);
        assertThat(testMetaSIRH.getCodeUO()).isEqualTo(DEFAULT_CODE_UO);
    }

    @Test
    @Transactional
    public void createMetaSIRHWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = metaSIRHRepository.findAll().size();

        // Create the MetaSIRH with an existing ID
        metaSIRH.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMetaSIRHMockMvc.perform(post("/api/meta-sirhs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(metaSIRH)))
            .andExpect(status().isBadRequest());

        // Validate the MetaSIRH in the database
        List<MetaSIRH> metaSIRHList = metaSIRHRepository.findAll();
        assertThat(metaSIRHList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllMetaSIRHS() throws Exception {
        // Initialize the database
        metaSIRHRepository.saveAndFlush(metaSIRH);

        // Get all the metaSIRHList
        restMetaSIRHMockMvc.perform(get("/api/meta-sirhs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(metaSIRH.getId().intValue())))
            .andExpect(jsonPath("$.[*].idTech").value(hasItem(DEFAULT_ID_TECH.intValue())))
            .andExpect(jsonPath("$.[*].numBadge").value(hasItem(DEFAULT_NUM_BADGE)))
            .andExpect(jsonPath("$.[*].numBadgeDest").value(hasItem(DEFAULT_NUM_BADGE_DEST)))
            .andExpect(jsonPath("$.[*].nomCollab").value(hasItem(DEFAULT_NOM_COLLAB)))
            .andExpect(jsonPath("$.[*].prenomCollab").value(hasItem(DEFAULT_PRENOM_COLLAB)))
            .andExpect(jsonPath("$.[*].codeUO").value(hasItem(DEFAULT_CODE_UO)));
    }
    
    @Test
    @Transactional
    public void getMetaSIRH() throws Exception {
        // Initialize the database
        metaSIRHRepository.saveAndFlush(metaSIRH);

        // Get the metaSIRH
        restMetaSIRHMockMvc.perform(get("/api/meta-sirhs/{id}", metaSIRH.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(metaSIRH.getId().intValue()))
            .andExpect(jsonPath("$.idTech").value(DEFAULT_ID_TECH.intValue()))
            .andExpect(jsonPath("$.numBadge").value(DEFAULT_NUM_BADGE))
            .andExpect(jsonPath("$.numBadgeDest").value(DEFAULT_NUM_BADGE_DEST))
            .andExpect(jsonPath("$.nomCollab").value(DEFAULT_NOM_COLLAB))
            .andExpect(jsonPath("$.prenomCollab").value(DEFAULT_PRENOM_COLLAB))
            .andExpect(jsonPath("$.codeUO").value(DEFAULT_CODE_UO));
    }

    @Test
    @Transactional
    public void getNonExistingMetaSIRH() throws Exception {
        // Get the metaSIRH
        restMetaSIRHMockMvc.perform(get("/api/meta-sirhs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMetaSIRH() throws Exception {
        // Initialize the database
        metaSIRHRepository.saveAndFlush(metaSIRH);

        int databaseSizeBeforeUpdate = metaSIRHRepository.findAll().size();

        // Update the metaSIRH
        MetaSIRH updatedMetaSIRH = metaSIRHRepository.findById(metaSIRH.getId()).get();
        // Disconnect from session so that the updates on updatedMetaSIRH are not directly saved in db
        em.detach(updatedMetaSIRH);
        updatedMetaSIRH
            .idTech(UPDATED_ID_TECH)
            .numBadge(UPDATED_NUM_BADGE)
            .numBadgeDest(UPDATED_NUM_BADGE_DEST)
            .nomCollab(UPDATED_NOM_COLLAB)
            .prenomCollab(UPDATED_PRENOM_COLLAB)
            .codeUO(UPDATED_CODE_UO);

        restMetaSIRHMockMvc.perform(put("/api/meta-sirhs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedMetaSIRH)))
            .andExpect(status().isOk());

        // Validate the MetaSIRH in the database
        List<MetaSIRH> metaSIRHList = metaSIRHRepository.findAll();
        assertThat(metaSIRHList).hasSize(databaseSizeBeforeUpdate);
        MetaSIRH testMetaSIRH = metaSIRHList.get(metaSIRHList.size() - 1);
        assertThat(testMetaSIRH.getIdTech()).isEqualTo(UPDATED_ID_TECH);
        assertThat(testMetaSIRH.getNumBadge()).isEqualTo(UPDATED_NUM_BADGE);
        assertThat(testMetaSIRH.getNumBadgeDest()).isEqualTo(UPDATED_NUM_BADGE_DEST);
        assertThat(testMetaSIRH.getNomCollab()).isEqualTo(UPDATED_NOM_COLLAB);
        assertThat(testMetaSIRH.getPrenomCollab()).isEqualTo(UPDATED_PRENOM_COLLAB);
        assertThat(testMetaSIRH.getCodeUO()).isEqualTo(UPDATED_CODE_UO);
    }

    @Test
    @Transactional
    public void updateNonExistingMetaSIRH() throws Exception {
        int databaseSizeBeforeUpdate = metaSIRHRepository.findAll().size();

        // Create the MetaSIRH

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMetaSIRHMockMvc.perform(put("/api/meta-sirhs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(metaSIRH)))
            .andExpect(status().isBadRequest());

        // Validate the MetaSIRH in the database
        List<MetaSIRH> metaSIRHList = metaSIRHRepository.findAll();
        assertThat(metaSIRHList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMetaSIRH() throws Exception {
        // Initialize the database
        metaSIRHRepository.saveAndFlush(metaSIRH);

        int databaseSizeBeforeDelete = metaSIRHRepository.findAll().size();

        // Delete the metaSIRH
        restMetaSIRHMockMvc.perform(delete("/api/meta-sirhs/{id}", metaSIRH.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MetaSIRH> metaSIRHList = metaSIRHRepository.findAll();
        assertThat(metaSIRHList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
