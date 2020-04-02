package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.MetaCoheris;
import com.mycompany.myapp.repository.MetaCoherisRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.MetaCoheris}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MetaCoherisResource {

    private final Logger log = LoggerFactory.getLogger(MetaCoherisResource.class);

    private static final String ENTITY_NAME = "metaCoheris";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MetaCoherisRepository metaCoherisRepository;

    public MetaCoherisResource(MetaCoherisRepository metaCoherisRepository) {
        this.metaCoherisRepository = metaCoherisRepository;
    }

    /**
     * {@code POST  /meta-coherises} : Create a new metaCoheris.
     *
     * @param metaCoheris the metaCoheris to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new metaCoheris, or with status {@code 400 (Bad Request)} if the metaCoheris has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/meta-coherises")
    public ResponseEntity<MetaCoheris> createMetaCoheris(@RequestBody MetaCoheris metaCoheris) throws URISyntaxException {
        log.debug("REST request to save MetaCoheris : {}", metaCoheris);
        if (metaCoheris.getId() != null) {
            throw new BadRequestAlertException("A new metaCoheris cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MetaCoheris result = metaCoherisRepository.save(metaCoheris);
        return ResponseEntity.created(new URI("/api/meta-coherises/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /meta-coherises} : Updates an existing metaCoheris.
     *
     * @param metaCoheris the metaCoheris to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated metaCoheris,
     * or with status {@code 400 (Bad Request)} if the metaCoheris is not valid,
     * or with status {@code 500 (Internal Server Error)} if the metaCoheris couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/meta-coherises")
    public ResponseEntity<MetaCoheris> updateMetaCoheris(@RequestBody MetaCoheris metaCoheris) throws URISyntaxException {
        log.debug("REST request to update MetaCoheris : {}", metaCoheris);
        if (metaCoheris.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MetaCoheris result = metaCoherisRepository.save(metaCoheris);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, metaCoheris.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /meta-coherises} : get all the metaCoherises.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of metaCoherises in body.
     */
    @GetMapping("/meta-coherises")
    public List<MetaCoheris> getAllMetaCoherises() {
        log.debug("REST request to get all MetaCoherises");
        return metaCoherisRepository.findAll();
    }

    /**
     * {@code GET  /meta-coherises/:id} : get the "id" metaCoheris.
     *
     * @param id the id of the metaCoheris to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the metaCoheris, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/meta-coherises/{id}")
    public ResponseEntity<MetaCoheris> getMetaCoheris(@PathVariable Long id) {
        log.debug("REST request to get MetaCoheris : {}", id);
        Optional<MetaCoheris> metaCoheris = metaCoherisRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(metaCoheris);
    }

    /**
     * {@code DELETE  /meta-coherises/:id} : delete the "id" metaCoheris.
     *
     * @param id the id of the metaCoheris to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/meta-coherises/{id}")
    public ResponseEntity<Void> deleteMetaCoheris(@PathVariable Long id) {
        log.debug("REST request to delete MetaCoheris : {}", id);
        metaCoherisRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
