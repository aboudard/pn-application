package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.PnApplicationApp;
import com.mycompany.myapp.domain.ParamDemande;
import com.mycompany.myapp.repository.ParamDemandeRepository;

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
 * Integration tests for the {@link ParamDemandeResource} REST controller.
 */
@SpringBootTest(classes = PnApplicationApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class ParamDemandeResourceIT {

    private static final String DEFAULT_ID_DEMANDE = "AAAAAAAAAA";
    private static final String UPDATED_ID_DEMANDE = "BBBBBBBBBB";

    private static final Long DEFAULT_FGCLE = 1L;
    private static final Long UPDATED_FGCLE = 2L;

    private static final Long DEFAULT_NOM_DATA_LOADER = 1L;
    private static final Long UPDATED_NOM_DATA_LOADER = 2L;

    private static final String DEFAULT_VERSION_DATA_LOADER = "AAAAAAAAAA";
    private static final String UPDATED_VERSION_DATA_LOADER = "BBBBBBBBBB";

    private static final Long DEFAULT_NOM_MODELE = 1L;
    private static final Long UPDATED_NOM_MODELE = 2L;

    private static final Long DEFAULT_ID_MODELE = 1L;
    private static final Long UPDATED_ID_MODELE = 2L;

    private static final String DEFAULT_VERSION_MODELE = "AAAAAAAAAA";
    private static final String UPDATED_VERSION_MODELE = "BBBBBBBBBB";

    private static final String DEFAULT_IMPRESSION = "AAAAAAAAAA";
    private static final String UPDATED_IMPRESSION = "BBBBBBBBBB";

    private static final String DEFAULT_ARCHIVAGE = "AAAAAAAAAA";
    private static final String UPDATED_ARCHIVAGE = "BBBBBBBBBB";

    private static final String DEFAULT_INTERACTIVE = "AAAAAAAAAA";
    private static final String UPDATED_INTERACTIVE = "BBBBBBBBBB";

    private static final String DEFAULT_STOCKAGE = "AAAAAAAAAA";
    private static final String UPDATED_STOCKAGE = "BBBBBBBBBB";

    private static final String DEFAULT_HOST_COL = "AAAAAAAAAA";
    private static final String UPDATED_HOST_COL = "BBBBBBBBBB";

    private static final String DEFAULT_IMP_CENTR = "AAAAAAAAAA";
    private static final String UPDATED_IMP_CENTR = "BBBBBBBBBB";

    private static final String DEFAULT_INST_COL = "AAAAAAAAAA";
    private static final String UPDATED_INST_COL = "BBBBBBBBBB";

    private static final String DEFAULT_IMP_H_CENTR = "AAAAAAAAAA";
    private static final String UPDATED_IMP_H_CENTR = "BBBBBBBBBB";

    private static final String DEFAULT_LOT_CONT = "AAAAAAAAAA";
    private static final String UPDATED_LOT_CONT = "BBBBBBBBBB";

    private static final String DEFAULT_DEST = "AAAAAAAAAA";
    private static final String UPDATED_DEST = "BBBBBBBBBB";

    private static final String DEFAULT_TRI_REGROUPT_BANN = "AAAAAAAAAA";
    private static final String UPDATED_TRI_REGROUPT_BANN = "BBBBBBBBBB";

    private static final Long DEFAULT_REGLES = 1L;
    private static final Long UPDATED_REGLES = 2L;

    private static final String DEFAULT_CONDITIONNEMENT = "AAAAAAAAAA";
    private static final String UPDATED_CONDITIONNEMENT = "BBBBBBBBBB";

    private static final String DEFAULT_PERIODICITE = "AAAAAAAAAA";
    private static final String UPDATED_PERIODICITE = "BBBBBBBBBB";

    private static final String DEFAULT_FLAG_MAIL = "AAAAAAAAAA";
    private static final String UPDATED_FLAG_MAIL = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Long DEFAULT_VERSION_MO = 1L;
    private static final Long UPDATED_VERSION_MO = 2L;

    private static final String DEFAULT_QUEUES_EAI_IN = "AAAAAAAAAA";
    private static final String UPDATED_QUEUES_EAI_IN = "BBBBBBBBBB";

    private static final String DEFAULT_QUEUES_EAI_OUT = "AAAAAAAAAA";
    private static final String UPDATED_QUEUES_EAI_OUT = "BBBBBBBBBB";

    private static final Long DEFAULT_LIBRE_2 = 1L;
    private static final Long UPDATED_LIBRE_2 = 2L;

    private static final Long DEFAULT_LIBRE_4 = 1L;
    private static final Long UPDATED_LIBRE_4 = 2L;

    @Autowired
    private ParamDemandeRepository paramDemandeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restParamDemandeMockMvc;

    private ParamDemande paramDemande;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ParamDemande createEntity(EntityManager em) {
        ParamDemande paramDemande = new ParamDemande()
            .idDemande(DEFAULT_ID_DEMANDE)
            .fgcle(DEFAULT_FGCLE)
            .nomDataLoader(DEFAULT_NOM_DATA_LOADER)
            .versionDataLoader(DEFAULT_VERSION_DATA_LOADER)
            .nomModele(DEFAULT_NOM_MODELE)
            .idModele(DEFAULT_ID_MODELE)
            .versionModele(DEFAULT_VERSION_MODELE)
            .impression(DEFAULT_IMPRESSION)
            .archivage(DEFAULT_ARCHIVAGE)
            .interactive(DEFAULT_INTERACTIVE)
            .stockage(DEFAULT_STOCKAGE)
            .hostCol(DEFAULT_HOST_COL)
            .impCentr(DEFAULT_IMP_CENTR)
            .instCol(DEFAULT_INST_COL)
            .impHCentr(DEFAULT_IMP_H_CENTR)
            .lotCont(DEFAULT_LOT_CONT)
            .dest(DEFAULT_DEST)
            .triRegrouptBann(DEFAULT_TRI_REGROUPT_BANN)
            .regles(DEFAULT_REGLES)
            .conditionnement(DEFAULT_CONDITIONNEMENT)
            .periodicite(DEFAULT_PERIODICITE)
            .flagMail(DEFAULT_FLAG_MAIL)
            .description(DEFAULT_DESCRIPTION)
            .versionMo(DEFAULT_VERSION_MO)
            .queuesEaiIn(DEFAULT_QUEUES_EAI_IN)
            .queuesEaiOut(DEFAULT_QUEUES_EAI_OUT)
            .libre2(DEFAULT_LIBRE_2)
            .libre4(DEFAULT_LIBRE_4);
        return paramDemande;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ParamDemande createUpdatedEntity(EntityManager em) {
        ParamDemande paramDemande = new ParamDemande()
            .idDemande(UPDATED_ID_DEMANDE)
            .fgcle(UPDATED_FGCLE)
            .nomDataLoader(UPDATED_NOM_DATA_LOADER)
            .versionDataLoader(UPDATED_VERSION_DATA_LOADER)
            .nomModele(UPDATED_NOM_MODELE)
            .idModele(UPDATED_ID_MODELE)
            .versionModele(UPDATED_VERSION_MODELE)
            .impression(UPDATED_IMPRESSION)
            .archivage(UPDATED_ARCHIVAGE)
            .interactive(UPDATED_INTERACTIVE)
            .stockage(UPDATED_STOCKAGE)
            .hostCol(UPDATED_HOST_COL)
            .impCentr(UPDATED_IMP_CENTR)
            .instCol(UPDATED_INST_COL)
            .impHCentr(UPDATED_IMP_H_CENTR)
            .lotCont(UPDATED_LOT_CONT)
            .dest(UPDATED_DEST)
            .triRegrouptBann(UPDATED_TRI_REGROUPT_BANN)
            .regles(UPDATED_REGLES)
            .conditionnement(UPDATED_CONDITIONNEMENT)
            .periodicite(UPDATED_PERIODICITE)
            .flagMail(UPDATED_FLAG_MAIL)
            .description(UPDATED_DESCRIPTION)
            .versionMo(UPDATED_VERSION_MO)
            .queuesEaiIn(UPDATED_QUEUES_EAI_IN)
            .queuesEaiOut(UPDATED_QUEUES_EAI_OUT)
            .libre2(UPDATED_LIBRE_2)
            .libre4(UPDATED_LIBRE_4);
        return paramDemande;
    }

    @BeforeEach
    public void initTest() {
        paramDemande = createEntity(em);
    }

    @Test
    @Transactional
    public void createParamDemande() throws Exception {
        int databaseSizeBeforeCreate = paramDemandeRepository.findAll().size();

        // Create the ParamDemande
        restParamDemandeMockMvc.perform(post("/api/param-demandes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(paramDemande)))
            .andExpect(status().isCreated());

        // Validate the ParamDemande in the database
        List<ParamDemande> paramDemandeList = paramDemandeRepository.findAll();
        assertThat(paramDemandeList).hasSize(databaseSizeBeforeCreate + 1);
        ParamDemande testParamDemande = paramDemandeList.get(paramDemandeList.size() - 1);
        assertThat(testParamDemande.getIdDemande()).isEqualTo(DEFAULT_ID_DEMANDE);
        assertThat(testParamDemande.getFgcle()).isEqualTo(DEFAULT_FGCLE);
        assertThat(testParamDemande.getNomDataLoader()).isEqualTo(DEFAULT_NOM_DATA_LOADER);
        assertThat(testParamDemande.getVersionDataLoader()).isEqualTo(DEFAULT_VERSION_DATA_LOADER);
        assertThat(testParamDemande.getNomModele()).isEqualTo(DEFAULT_NOM_MODELE);
        assertThat(testParamDemande.getIdModele()).isEqualTo(DEFAULT_ID_MODELE);
        assertThat(testParamDemande.getVersionModele()).isEqualTo(DEFAULT_VERSION_MODELE);
        assertThat(testParamDemande.getImpression()).isEqualTo(DEFAULT_IMPRESSION);
        assertThat(testParamDemande.getArchivage()).isEqualTo(DEFAULT_ARCHIVAGE);
        assertThat(testParamDemande.getInteractive()).isEqualTo(DEFAULT_INTERACTIVE);
        assertThat(testParamDemande.getStockage()).isEqualTo(DEFAULT_STOCKAGE);
        assertThat(testParamDemande.getHostCol()).isEqualTo(DEFAULT_HOST_COL);
        assertThat(testParamDemande.getImpCentr()).isEqualTo(DEFAULT_IMP_CENTR);
        assertThat(testParamDemande.getInstCol()).isEqualTo(DEFAULT_INST_COL);
        assertThat(testParamDemande.getImpHCentr()).isEqualTo(DEFAULT_IMP_H_CENTR);
        assertThat(testParamDemande.getLotCont()).isEqualTo(DEFAULT_LOT_CONT);
        assertThat(testParamDemande.getDest()).isEqualTo(DEFAULT_DEST);
        assertThat(testParamDemande.getTriRegrouptBann()).isEqualTo(DEFAULT_TRI_REGROUPT_BANN);
        assertThat(testParamDemande.getRegles()).isEqualTo(DEFAULT_REGLES);
        assertThat(testParamDemande.getConditionnement()).isEqualTo(DEFAULT_CONDITIONNEMENT);
        assertThat(testParamDemande.getPeriodicite()).isEqualTo(DEFAULT_PERIODICITE);
        assertThat(testParamDemande.getFlagMail()).isEqualTo(DEFAULT_FLAG_MAIL);
        assertThat(testParamDemande.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testParamDemande.getVersionMo()).isEqualTo(DEFAULT_VERSION_MO);
        assertThat(testParamDemande.getQueuesEaiIn()).isEqualTo(DEFAULT_QUEUES_EAI_IN);
        assertThat(testParamDemande.getQueuesEaiOut()).isEqualTo(DEFAULT_QUEUES_EAI_OUT);
        assertThat(testParamDemande.getLibre2()).isEqualTo(DEFAULT_LIBRE_2);
        assertThat(testParamDemande.getLibre4()).isEqualTo(DEFAULT_LIBRE_4);
    }

    @Test
    @Transactional
    public void createParamDemandeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = paramDemandeRepository.findAll().size();

        // Create the ParamDemande with an existing ID
        paramDemande.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restParamDemandeMockMvc.perform(post("/api/param-demandes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(paramDemande)))
            .andExpect(status().isBadRequest());

        // Validate the ParamDemande in the database
        List<ParamDemande> paramDemandeList = paramDemandeRepository.findAll();
        assertThat(paramDemandeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllParamDemandes() throws Exception {
        // Initialize the database
        paramDemandeRepository.saveAndFlush(paramDemande);

        // Get all the paramDemandeList
        restParamDemandeMockMvc.perform(get("/api/param-demandes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(paramDemande.getId().intValue())))
            .andExpect(jsonPath("$.[*].idDemande").value(hasItem(DEFAULT_ID_DEMANDE)))
            .andExpect(jsonPath("$.[*].fgcle").value(hasItem(DEFAULT_FGCLE.intValue())))
            .andExpect(jsonPath("$.[*].nomDataLoader").value(hasItem(DEFAULT_NOM_DATA_LOADER.intValue())))
            .andExpect(jsonPath("$.[*].versionDataLoader").value(hasItem(DEFAULT_VERSION_DATA_LOADER)))
            .andExpect(jsonPath("$.[*].nomModele").value(hasItem(DEFAULT_NOM_MODELE.intValue())))
            .andExpect(jsonPath("$.[*].idModele").value(hasItem(DEFAULT_ID_MODELE.intValue())))
            .andExpect(jsonPath("$.[*].versionModele").value(hasItem(DEFAULT_VERSION_MODELE)))
            .andExpect(jsonPath("$.[*].impression").value(hasItem(DEFAULT_IMPRESSION)))
            .andExpect(jsonPath("$.[*].archivage").value(hasItem(DEFAULT_ARCHIVAGE)))
            .andExpect(jsonPath("$.[*].interactive").value(hasItem(DEFAULT_INTERACTIVE)))
            .andExpect(jsonPath("$.[*].stockage").value(hasItem(DEFAULT_STOCKAGE)))
            .andExpect(jsonPath("$.[*].hostCol").value(hasItem(DEFAULT_HOST_COL)))
            .andExpect(jsonPath("$.[*].impCentr").value(hasItem(DEFAULT_IMP_CENTR)))
            .andExpect(jsonPath("$.[*].instCol").value(hasItem(DEFAULT_INST_COL)))
            .andExpect(jsonPath("$.[*].impHCentr").value(hasItem(DEFAULT_IMP_H_CENTR)))
            .andExpect(jsonPath("$.[*].lotCont").value(hasItem(DEFAULT_LOT_CONT)))
            .andExpect(jsonPath("$.[*].dest").value(hasItem(DEFAULT_DEST)))
            .andExpect(jsonPath("$.[*].triRegrouptBann").value(hasItem(DEFAULT_TRI_REGROUPT_BANN)))
            .andExpect(jsonPath("$.[*].regles").value(hasItem(DEFAULT_REGLES.intValue())))
            .andExpect(jsonPath("$.[*].conditionnement").value(hasItem(DEFAULT_CONDITIONNEMENT)))
            .andExpect(jsonPath("$.[*].periodicite").value(hasItem(DEFAULT_PERIODICITE)))
            .andExpect(jsonPath("$.[*].flagMail").value(hasItem(DEFAULT_FLAG_MAIL)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].versionMo").value(hasItem(DEFAULT_VERSION_MO.intValue())))
            .andExpect(jsonPath("$.[*].queuesEaiIn").value(hasItem(DEFAULT_QUEUES_EAI_IN)))
            .andExpect(jsonPath("$.[*].queuesEaiOut").value(hasItem(DEFAULT_QUEUES_EAI_OUT)))
            .andExpect(jsonPath("$.[*].libre2").value(hasItem(DEFAULT_LIBRE_2.intValue())))
            .andExpect(jsonPath("$.[*].libre4").value(hasItem(DEFAULT_LIBRE_4.intValue())));
    }
    
    @Test
    @Transactional
    public void getParamDemande() throws Exception {
        // Initialize the database
        paramDemandeRepository.saveAndFlush(paramDemande);

        // Get the paramDemande
        restParamDemandeMockMvc.perform(get("/api/param-demandes/{id}", paramDemande.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(paramDemande.getId().intValue()))
            .andExpect(jsonPath("$.idDemande").value(DEFAULT_ID_DEMANDE))
            .andExpect(jsonPath("$.fgcle").value(DEFAULT_FGCLE.intValue()))
            .andExpect(jsonPath("$.nomDataLoader").value(DEFAULT_NOM_DATA_LOADER.intValue()))
            .andExpect(jsonPath("$.versionDataLoader").value(DEFAULT_VERSION_DATA_LOADER))
            .andExpect(jsonPath("$.nomModele").value(DEFAULT_NOM_MODELE.intValue()))
            .andExpect(jsonPath("$.idModele").value(DEFAULT_ID_MODELE.intValue()))
            .andExpect(jsonPath("$.versionModele").value(DEFAULT_VERSION_MODELE))
            .andExpect(jsonPath("$.impression").value(DEFAULT_IMPRESSION))
            .andExpect(jsonPath("$.archivage").value(DEFAULT_ARCHIVAGE))
            .andExpect(jsonPath("$.interactive").value(DEFAULT_INTERACTIVE))
            .andExpect(jsonPath("$.stockage").value(DEFAULT_STOCKAGE))
            .andExpect(jsonPath("$.hostCol").value(DEFAULT_HOST_COL))
            .andExpect(jsonPath("$.impCentr").value(DEFAULT_IMP_CENTR))
            .andExpect(jsonPath("$.instCol").value(DEFAULT_INST_COL))
            .andExpect(jsonPath("$.impHCentr").value(DEFAULT_IMP_H_CENTR))
            .andExpect(jsonPath("$.lotCont").value(DEFAULT_LOT_CONT))
            .andExpect(jsonPath("$.dest").value(DEFAULT_DEST))
            .andExpect(jsonPath("$.triRegrouptBann").value(DEFAULT_TRI_REGROUPT_BANN))
            .andExpect(jsonPath("$.regles").value(DEFAULT_REGLES.intValue()))
            .andExpect(jsonPath("$.conditionnement").value(DEFAULT_CONDITIONNEMENT))
            .andExpect(jsonPath("$.periodicite").value(DEFAULT_PERIODICITE))
            .andExpect(jsonPath("$.flagMail").value(DEFAULT_FLAG_MAIL))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.versionMo").value(DEFAULT_VERSION_MO.intValue()))
            .andExpect(jsonPath("$.queuesEaiIn").value(DEFAULT_QUEUES_EAI_IN))
            .andExpect(jsonPath("$.queuesEaiOut").value(DEFAULT_QUEUES_EAI_OUT))
            .andExpect(jsonPath("$.libre2").value(DEFAULT_LIBRE_2.intValue()))
            .andExpect(jsonPath("$.libre4").value(DEFAULT_LIBRE_4.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingParamDemande() throws Exception {
        // Get the paramDemande
        restParamDemandeMockMvc.perform(get("/api/param-demandes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateParamDemande() throws Exception {
        // Initialize the database
        paramDemandeRepository.saveAndFlush(paramDemande);

        int databaseSizeBeforeUpdate = paramDemandeRepository.findAll().size();

        // Update the paramDemande
        ParamDemande updatedParamDemande = paramDemandeRepository.findById(paramDemande.getId()).get();
        // Disconnect from session so that the updates on updatedParamDemande are not directly saved in db
        em.detach(updatedParamDemande);
        updatedParamDemande
            .idDemande(UPDATED_ID_DEMANDE)
            .fgcle(UPDATED_FGCLE)
            .nomDataLoader(UPDATED_NOM_DATA_LOADER)
            .versionDataLoader(UPDATED_VERSION_DATA_LOADER)
            .nomModele(UPDATED_NOM_MODELE)
            .idModele(UPDATED_ID_MODELE)
            .versionModele(UPDATED_VERSION_MODELE)
            .impression(UPDATED_IMPRESSION)
            .archivage(UPDATED_ARCHIVAGE)
            .interactive(UPDATED_INTERACTIVE)
            .stockage(UPDATED_STOCKAGE)
            .hostCol(UPDATED_HOST_COL)
            .impCentr(UPDATED_IMP_CENTR)
            .instCol(UPDATED_INST_COL)
            .impHCentr(UPDATED_IMP_H_CENTR)
            .lotCont(UPDATED_LOT_CONT)
            .dest(UPDATED_DEST)
            .triRegrouptBann(UPDATED_TRI_REGROUPT_BANN)
            .regles(UPDATED_REGLES)
            .conditionnement(UPDATED_CONDITIONNEMENT)
            .periodicite(UPDATED_PERIODICITE)
            .flagMail(UPDATED_FLAG_MAIL)
            .description(UPDATED_DESCRIPTION)
            .versionMo(UPDATED_VERSION_MO)
            .queuesEaiIn(UPDATED_QUEUES_EAI_IN)
            .queuesEaiOut(UPDATED_QUEUES_EAI_OUT)
            .libre2(UPDATED_LIBRE_2)
            .libre4(UPDATED_LIBRE_4);

        restParamDemandeMockMvc.perform(put("/api/param-demandes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedParamDemande)))
            .andExpect(status().isOk());

        // Validate the ParamDemande in the database
        List<ParamDemande> paramDemandeList = paramDemandeRepository.findAll();
        assertThat(paramDemandeList).hasSize(databaseSizeBeforeUpdate);
        ParamDemande testParamDemande = paramDemandeList.get(paramDemandeList.size() - 1);
        assertThat(testParamDemande.getIdDemande()).isEqualTo(UPDATED_ID_DEMANDE);
        assertThat(testParamDemande.getFgcle()).isEqualTo(UPDATED_FGCLE);
        assertThat(testParamDemande.getNomDataLoader()).isEqualTo(UPDATED_NOM_DATA_LOADER);
        assertThat(testParamDemande.getVersionDataLoader()).isEqualTo(UPDATED_VERSION_DATA_LOADER);
        assertThat(testParamDemande.getNomModele()).isEqualTo(UPDATED_NOM_MODELE);
        assertThat(testParamDemande.getIdModele()).isEqualTo(UPDATED_ID_MODELE);
        assertThat(testParamDemande.getVersionModele()).isEqualTo(UPDATED_VERSION_MODELE);
        assertThat(testParamDemande.getImpression()).isEqualTo(UPDATED_IMPRESSION);
        assertThat(testParamDemande.getArchivage()).isEqualTo(UPDATED_ARCHIVAGE);
        assertThat(testParamDemande.getInteractive()).isEqualTo(UPDATED_INTERACTIVE);
        assertThat(testParamDemande.getStockage()).isEqualTo(UPDATED_STOCKAGE);
        assertThat(testParamDemande.getHostCol()).isEqualTo(UPDATED_HOST_COL);
        assertThat(testParamDemande.getImpCentr()).isEqualTo(UPDATED_IMP_CENTR);
        assertThat(testParamDemande.getInstCol()).isEqualTo(UPDATED_INST_COL);
        assertThat(testParamDemande.getImpHCentr()).isEqualTo(UPDATED_IMP_H_CENTR);
        assertThat(testParamDemande.getLotCont()).isEqualTo(UPDATED_LOT_CONT);
        assertThat(testParamDemande.getDest()).isEqualTo(UPDATED_DEST);
        assertThat(testParamDemande.getTriRegrouptBann()).isEqualTo(UPDATED_TRI_REGROUPT_BANN);
        assertThat(testParamDemande.getRegles()).isEqualTo(UPDATED_REGLES);
        assertThat(testParamDemande.getConditionnement()).isEqualTo(UPDATED_CONDITIONNEMENT);
        assertThat(testParamDemande.getPeriodicite()).isEqualTo(UPDATED_PERIODICITE);
        assertThat(testParamDemande.getFlagMail()).isEqualTo(UPDATED_FLAG_MAIL);
        assertThat(testParamDemande.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testParamDemande.getVersionMo()).isEqualTo(UPDATED_VERSION_MO);
        assertThat(testParamDemande.getQueuesEaiIn()).isEqualTo(UPDATED_QUEUES_EAI_IN);
        assertThat(testParamDemande.getQueuesEaiOut()).isEqualTo(UPDATED_QUEUES_EAI_OUT);
        assertThat(testParamDemande.getLibre2()).isEqualTo(UPDATED_LIBRE_2);
        assertThat(testParamDemande.getLibre4()).isEqualTo(UPDATED_LIBRE_4);
    }

    @Test
    @Transactional
    public void updateNonExistingParamDemande() throws Exception {
        int databaseSizeBeforeUpdate = paramDemandeRepository.findAll().size();

        // Create the ParamDemande

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restParamDemandeMockMvc.perform(put("/api/param-demandes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(paramDemande)))
            .andExpect(status().isBadRequest());

        // Validate the ParamDemande in the database
        List<ParamDemande> paramDemandeList = paramDemandeRepository.findAll();
        assertThat(paramDemandeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteParamDemande() throws Exception {
        // Initialize the database
        paramDemandeRepository.saveAndFlush(paramDemande);

        int databaseSizeBeforeDelete = paramDemandeRepository.findAll().size();

        // Delete the paramDemande
        restParamDemandeMockMvc.perform(delete("/api/param-demandes/{id}", paramDemande.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ParamDemande> paramDemandeList = paramDemandeRepository.findAll();
        assertThat(paramDemandeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
