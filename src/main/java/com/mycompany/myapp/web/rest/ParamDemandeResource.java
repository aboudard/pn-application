package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.ParamDemande;
import com.mycompany.myapp.repository.ParamDemandeRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.ParamDemande}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ParamDemandeResource {

    private final Logger log = LoggerFactory.getLogger(ParamDemandeResource.class);

    private static final String ENTITY_NAME = "paramDemande";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ParamDemandeRepository paramDemandeRepository;

    public ParamDemandeResource(ParamDemandeRepository paramDemandeRepository) {
        this.paramDemandeRepository = paramDemandeRepository;
    }

    /**
     * {@code POST  /param-demandes} : Create a new paramDemande.
     *
     * @param paramDemande the paramDemande to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new paramDemande, or with status {@code 400 (Bad Request)} if the paramDemande has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/param-demandes")
    public ResponseEntity<ParamDemande> createParamDemande(@RequestBody ParamDemande paramDemande) throws URISyntaxException {
        log.debug("REST request to save ParamDemande : {}", paramDemande);
        if (paramDemande.getId() != null) {
            throw new BadRequestAlertException("A new paramDemande cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ParamDemande result = paramDemandeRepository.save(paramDemande);
        return ResponseEntity.created(new URI("/api/param-demandes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /param-demandes} : Updates an existing paramDemande.
     *
     * @param paramDemande the paramDemande to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated paramDemande,
     * or with status {@code 400 (Bad Request)} if the paramDemande is not valid,
     * or with status {@code 500 (Internal Server Error)} if the paramDemande couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/param-demandes")
    public ResponseEntity<ParamDemande> updateParamDemande(@RequestBody ParamDemande paramDemande) throws URISyntaxException {
        log.debug("REST request to update ParamDemande : {}", paramDemande);
        if (paramDemande.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ParamDemande result = paramDemandeRepository.save(paramDemande);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, paramDemande.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /param-demandes} : get all the paramDemandes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of paramDemandes in body.
     */
    @GetMapping("/param-demandes")
    public List<ParamDemande> getAllParamDemandes() {
        log.debug("REST request to get all ParamDemandes");
        return paramDemandeRepository.findAll();
    }

    /**
     * {@code GET  /param-demandes/:id} : get the "id" paramDemande.
     *
     * @param id the id of the paramDemande to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the paramDemande, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/param-demandes/{id}")
    public ResponseEntity<ParamDemande> getParamDemande(@PathVariable Long id) {
        log.debug("REST request to get ParamDemande : {}", id);
        Optional<ParamDemande> paramDemande = paramDemandeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(paramDemande);
    }

    /**
     * {@code DELETE  /param-demandes/:id} : delete the "id" paramDemande.
     *
     * @param id the id of the paramDemande to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/param-demandes/{id}")
    public ResponseEntity<Void> deleteParamDemande(@PathVariable Long id) {
        log.debug("REST request to delete ParamDemande : {}", id);
        paramDemandeRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
