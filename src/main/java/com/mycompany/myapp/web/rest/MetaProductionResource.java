package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.MetaProduction;
import com.mycompany.myapp.repository.MetaProductionRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.MetaProduction}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MetaProductionResource {

    private final Logger log = LoggerFactory.getLogger(MetaProductionResource.class);

    private static final String ENTITY_NAME = "metaProduction";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MetaProductionRepository metaProductionRepository;

    public MetaProductionResource(MetaProductionRepository metaProductionRepository) {
        this.metaProductionRepository = metaProductionRepository;
    }

    /**
     * {@code POST  /meta-productions} : Create a new metaProduction.
     *
     * @param metaProduction the metaProduction to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new metaProduction, or with status {@code 400 (Bad Request)} if the metaProduction has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/meta-productions")
    public ResponseEntity<MetaProduction> createMetaProduction(@RequestBody MetaProduction metaProduction) throws URISyntaxException {
        log.debug("REST request to save MetaProduction : {}", metaProduction);
        if (metaProduction.getId() != null) {
            throw new BadRequestAlertException("A new metaProduction cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MetaProduction result = metaProductionRepository.save(metaProduction);
        return ResponseEntity.created(new URI("/api/meta-productions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /meta-productions} : Updates an existing metaProduction.
     *
     * @param metaProduction the metaProduction to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated metaProduction,
     * or with status {@code 400 (Bad Request)} if the metaProduction is not valid,
     * or with status {@code 500 (Internal Server Error)} if the metaProduction couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/meta-productions")
    public ResponseEntity<MetaProduction> updateMetaProduction(@RequestBody MetaProduction metaProduction) throws URISyntaxException {
        log.debug("REST request to update MetaProduction : {}", metaProduction);
        if (metaProduction.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MetaProduction result = metaProductionRepository.save(metaProduction);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, metaProduction.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /meta-productions} : get all the metaProductions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of metaProductions in body.
     */
    @GetMapping("/meta-productions")
    public List<MetaProduction> getAllMetaProductions() {
        log.debug("REST request to get all MetaProductions");
        return metaProductionRepository.findAll();
    }

    /**
     * {@code GET  /meta-productions/:id} : get the "id" metaProduction.
     *
     * @param id the id of the metaProduction to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the metaProduction, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/meta-productions/{id}")
    public ResponseEntity<MetaProduction> getMetaProduction(@PathVariable Long id) {
        log.debug("REST request to get MetaProduction : {}", id);
        Optional<MetaProduction> metaProduction = metaProductionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(metaProduction);
    }

    /**
     * {@code DELETE  /meta-productions/:id} : delete the "id" metaProduction.
     *
     * @param id the id of the metaProduction to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/meta-productions/{id}")
    public ResponseEntity<Void> deleteMetaProduction(@PathVariable Long id) {
        log.debug("REST request to delete MetaProduction : {}", id);
        metaProductionRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
