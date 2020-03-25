package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.PnApplicationApp;
import com.mycompany.myapp.domain.Demande;
import com.mycompany.myapp.repository.DemandeRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.domain.enumeration.Statut;
/**
 * Integration tests for the {@link DemandeResource} REST controller.
 */
@SpringBootTest(classes = PnApplicationApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class DemandeResourceIT {

    private static final Long DEFAULT_ID_TECH = 1L;
    private static final Long UPDATED_ID_TECH = 2L;

    private static final String DEFAULT_DOMAINE = "AAAAAAAAAA";
    private static final String UPDATED_DOMAINE = "BBBBBBBBBB";

    private static final String DEFAULT_ID_DEMANDE = "AAAAAAAAAA";
    private static final String UPDATED_ID_DEMANDE = "BBBBBBBBBB";

    private static final String DEFAULT_BADGE = "AAAAAAAAAA";
    private static final String UPDATED_BADGE = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE_DEMANDE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_DEMANDE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Statut DEFAULT_STATUT = Statut.A_FINALISER;
    private static final Statut UPDATED_STATUT = Statut.BROUILLON;

    private static final byte[] DEFAULT_FLUX = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_FLUX = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_FLUX_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_FLUX_CONTENT_TYPE = "image/png";

    @Autowired
    private DemandeRepository demandeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDemandeMockMvc;

    private Demande demande;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Demande createEntity(EntityManager em) {
        Demande demande = new Demande()
            .idTech(DEFAULT_ID_TECH)
            .domaine(DEFAULT_DOMAINE)
            .idDemande(DEFAULT_ID_DEMANDE)
            .badge(DEFAULT_BADGE)
            .dateDemande(DEFAULT_DATE_DEMANDE)
            .statut(DEFAULT_STATUT)
            .flux(DEFAULT_FLUX)
            .fluxContentType(DEFAULT_FLUX_CONTENT_TYPE);
        return demande;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Demande createUpdatedEntity(EntityManager em) {
        Demande demande = new Demande()
            .idTech(UPDATED_ID_TECH)
            .domaine(UPDATED_DOMAINE)
            .idDemande(UPDATED_ID_DEMANDE)
            .badge(UPDATED_BADGE)
            .dateDemande(UPDATED_DATE_DEMANDE)
            .statut(UPDATED_STATUT)
            .flux(UPDATED_FLUX)
            .fluxContentType(UPDATED_FLUX_CONTENT_TYPE);
        return demande;
    }

    @BeforeEach
    public void initTest() {
        demande = createEntity(em);
    }

    @Test
    @Transactional
    public void createDemande() throws Exception {
        int databaseSizeBeforeCreate = demandeRepository.findAll().size();

        // Create the Demande
        restDemandeMockMvc.perform(post("/api/demandes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(demande)))
            .andExpect(status().isCreated());

        // Validate the Demande in the database
        List<Demande> demandeList = demandeRepository.findAll();
        assertThat(demandeList).hasSize(databaseSizeBeforeCreate + 1);
        Demande testDemande = demandeList.get(demandeList.size() - 1);
        assertThat(testDemande.getIdTech()).isEqualTo(DEFAULT_ID_TECH);
        assertThat(testDemande.getDomaine()).isEqualTo(DEFAULT_DOMAINE);
        assertThat(testDemande.getIdDemande()).isEqualTo(DEFAULT_ID_DEMANDE);
        assertThat(testDemande.getBadge()).isEqualTo(DEFAULT_BADGE);
        assertThat(testDemande.getDateDemande()).isEqualTo(DEFAULT_DATE_DEMANDE);
        assertThat(testDemande.getStatut()).isEqualTo(DEFAULT_STATUT);
        assertThat(testDemande.getFlux()).isEqualTo(DEFAULT_FLUX);
        assertThat(testDemande.getFluxContentType()).isEqualTo(DEFAULT_FLUX_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createDemandeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = demandeRepository.findAll().size();

        // Create the Demande with an existing ID
        demande.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDemandeMockMvc.perform(post("/api/demandes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(demande)))
            .andExpect(status().isBadRequest());

        // Validate the Demande in the database
        List<Demande> demandeList = demandeRepository.findAll();
        assertThat(demandeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkIdTechIsRequired() throws Exception {
        int databaseSizeBeforeTest = demandeRepository.findAll().size();
        // set the field null
        demande.setIdTech(null);

        // Create the Demande, which fails.

        restDemandeMockMvc.perform(post("/api/demandes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(demande)))
            .andExpect(status().isBadRequest());

        List<Demande> demandeList = demandeRepository.findAll();
        assertThat(demandeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDemandes() throws Exception {
        // Initialize the database
        demandeRepository.saveAndFlush(demande);

        // Get all the demandeList
        restDemandeMockMvc.perform(get("/api/demandes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(demande.getId().intValue())))
            .andExpect(jsonPath("$.[*].idTech").value(hasItem(DEFAULT_ID_TECH.intValue())))
            .andExpect(jsonPath("$.[*].domaine").value(hasItem(DEFAULT_DOMAINE)))
            .andExpect(jsonPath("$.[*].idDemande").value(hasItem(DEFAULT_ID_DEMANDE)))
            .andExpect(jsonPath("$.[*].badge").value(hasItem(DEFAULT_BADGE)))
            .andExpect(jsonPath("$.[*].dateDemande").value(hasItem(DEFAULT_DATE_DEMANDE.toString())))
            .andExpect(jsonPath("$.[*].statut").value(hasItem(DEFAULT_STATUT.toString())))
            .andExpect(jsonPath("$.[*].fluxContentType").value(hasItem(DEFAULT_FLUX_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].flux").value(hasItem(Base64Utils.encodeToString(DEFAULT_FLUX))));
    }
    
    @Test
    @Transactional
    public void getDemande() throws Exception {
        // Initialize the database
        demandeRepository.saveAndFlush(demande);

        // Get the demande
        restDemandeMockMvc.perform(get("/api/demandes/{id}", demande.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(demande.getId().intValue()))
            .andExpect(jsonPath("$.idTech").value(DEFAULT_ID_TECH.intValue()))
            .andExpect(jsonPath("$.domaine").value(DEFAULT_DOMAINE))
            .andExpect(jsonPath("$.idDemande").value(DEFAULT_ID_DEMANDE))
            .andExpect(jsonPath("$.badge").value(DEFAULT_BADGE))
            .andExpect(jsonPath("$.dateDemande").value(DEFAULT_DATE_DEMANDE.toString()))
            .andExpect(jsonPath("$.statut").value(DEFAULT_STATUT.toString()))
            .andExpect(jsonPath("$.fluxContentType").value(DEFAULT_FLUX_CONTENT_TYPE))
            .andExpect(jsonPath("$.flux").value(Base64Utils.encodeToString(DEFAULT_FLUX)));
    }

    @Test
    @Transactional
    public void getNonExistingDemande() throws Exception {
        // Get the demande
        restDemandeMockMvc.perform(get("/api/demandes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDemande() throws Exception {
        // Initialize the database
        demandeRepository.saveAndFlush(demande);

        int databaseSizeBeforeUpdate = demandeRepository.findAll().size();

        // Update the demande
        Demande updatedDemande = demandeRepository.findById(demande.getId()).get();
        // Disconnect from session so that the updates on updatedDemande are not directly saved in db
        em.detach(updatedDemande);
        updatedDemande
            .idTech(UPDATED_ID_TECH)
            .domaine(UPDATED_DOMAINE)
            .idDemande(UPDATED_ID_DEMANDE)
            .badge(UPDATED_BADGE)
            .dateDemande(UPDATED_DATE_DEMANDE)
            .statut(UPDATED_STATUT)
            .flux(UPDATED_FLUX)
            .fluxContentType(UPDATED_FLUX_CONTENT_TYPE);

        restDemandeMockMvc.perform(put("/api/demandes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedDemande)))
            .andExpect(status().isOk());

        // Validate the Demande in the database
        List<Demande> demandeList = demandeRepository.findAll();
        assertThat(demandeList).hasSize(databaseSizeBeforeUpdate);
        Demande testDemande = demandeList.get(demandeList.size() - 1);
        assertThat(testDemande.getIdTech()).isEqualTo(UPDATED_ID_TECH);
        assertThat(testDemande.getDomaine()).isEqualTo(UPDATED_DOMAINE);
        assertThat(testDemande.getIdDemande()).isEqualTo(UPDATED_ID_DEMANDE);
        assertThat(testDemande.getBadge()).isEqualTo(UPDATED_BADGE);
        assertThat(testDemande.getDateDemande()).isEqualTo(UPDATED_DATE_DEMANDE);
        assertThat(testDemande.getStatut()).isEqualTo(UPDATED_STATUT);
        assertThat(testDemande.getFlux()).isEqualTo(UPDATED_FLUX);
        assertThat(testDemande.getFluxContentType()).isEqualTo(UPDATED_FLUX_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingDemande() throws Exception {
        int databaseSizeBeforeUpdate = demandeRepository.findAll().size();

        // Create the Demande

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDemandeMockMvc.perform(put("/api/demandes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(demande)))
            .andExpect(status().isBadRequest());

        // Validate the Demande in the database
        List<Demande> demandeList = demandeRepository.findAll();
        assertThat(demandeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDemande() throws Exception {
        // Initialize the database
        demandeRepository.saveAndFlush(demande);

        int databaseSizeBeforeDelete = demandeRepository.findAll().size();

        // Delete the demande
        restDemandeMockMvc.perform(delete("/api/demandes/{id}", demande.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Demande> demandeList = demandeRepository.findAll();
        assertThat(demandeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
