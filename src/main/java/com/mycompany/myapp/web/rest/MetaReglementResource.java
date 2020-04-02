package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.MetaReglement;
import com.mycompany.myapp.repository.MetaReglementRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.MetaReglement}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MetaReglementResource {

    private final Logger log = LoggerFactory.getLogger(MetaReglementResource.class);

    private static final String ENTITY_NAME = "metaReglement";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MetaReglementRepository metaReglementRepository;

    public MetaReglementResource(MetaReglementRepository metaReglementRepository) {
        this.metaReglementRepository = metaReglementRepository;
    }

    /**
     * {@code POST  /meta-reglements} : Create a new metaReglement.
     *
     * @param metaReglement the metaReglement to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new metaReglement, or with status {@code 400 (Bad Request)} if the metaReglement has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/meta-reglements")
    public ResponseEntity<MetaReglement> createMetaReglement(@RequestBody MetaReglement metaReglement) throws URISyntaxException {
        log.debug("REST request to save MetaReglement : {}", metaReglement);
        if (metaReglement.getId() != null) {
            throw new BadRequestAlertException("A new metaReglement cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MetaReglement result = metaReglementRepository.save(metaReglement);
        return ResponseEntity.created(new URI("/api/meta-reglements/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /meta-reglements} : Updates an existing metaReglement.
     *
     * @param metaReglement the metaReglement to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated metaReglement,
     * or with status {@code 400 (Bad Request)} if the metaReglement is not valid,
     * or with status {@code 500 (Internal Server Error)} if the metaReglement couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/meta-reglements")
    public ResponseEntity<MetaReglement> updateMetaReglement(@RequestBody MetaReglement metaReglement) throws URISyntaxException {
        log.debug("REST request to update MetaReglement : {}", metaReglement);
        if (metaReglement.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MetaReglement result = metaReglementRepository.save(metaReglement);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, metaReglement.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /meta-reglements} : get all the metaReglements.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of metaReglements in body.
     */
    @GetMapping("/meta-reglements")
    public List<MetaReglement> getAllMetaReglements() {
        log.debug("REST request to get all MetaReglements");
        return metaReglementRepository.findAll();
    }

    /**
     * {@code GET  /meta-reglements/:id} : get the "id" metaReglement.
     *
     * @param id the id of the metaReglement to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the metaReglement, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/meta-reglements/{id}")
    public ResponseEntity<MetaReglement> getMetaReglement(@PathVariable Long id) {
        log.debug("REST request to get MetaReglement : {}", id);
        Optional<MetaReglement> metaReglement = metaReglementRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(metaReglement);
    }

    /**
     * {@code DELETE  /meta-reglements/:id} : delete the "id" metaReglement.
     *
     * @param id the id of the metaReglement to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/meta-reglements/{id}")
    public ResponseEntity<Void> deleteMetaReglement(@PathVariable Long id) {
        log.debug("REST request to delete MetaReglement : {}", id);
        metaReglementRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
