package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.MetaSelMed;
import com.mycompany.myapp.repository.MetaSelMedRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.MetaSelMed}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MetaSelMedResource {

    private final Logger log = LoggerFactory.getLogger(MetaSelMedResource.class);

    private static final String ENTITY_NAME = "metaSelMed";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MetaSelMedRepository metaSelMedRepository;

    public MetaSelMedResource(MetaSelMedRepository metaSelMedRepository) {
        this.metaSelMedRepository = metaSelMedRepository;
    }

    /**
     * {@code POST  /meta-sel-meds} : Create a new metaSelMed.
     *
     * @param metaSelMed the metaSelMed to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new metaSelMed, or with status {@code 400 (Bad Request)} if the metaSelMed has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/meta-sel-meds")
    public ResponseEntity<MetaSelMed> createMetaSelMed(@RequestBody MetaSelMed metaSelMed) throws URISyntaxException {
        log.debug("REST request to save MetaSelMed : {}", metaSelMed);
        if (metaSelMed.getId() != null) {
            throw new BadRequestAlertException("A new metaSelMed cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MetaSelMed result = metaSelMedRepository.save(metaSelMed);
        return ResponseEntity.created(new URI("/api/meta-sel-meds/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /meta-sel-meds} : Updates an existing metaSelMed.
     *
     * @param metaSelMed the metaSelMed to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated metaSelMed,
     * or with status {@code 400 (Bad Request)} if the metaSelMed is not valid,
     * or with status {@code 500 (Internal Server Error)} if the metaSelMed couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/meta-sel-meds")
    public ResponseEntity<MetaSelMed> updateMetaSelMed(@RequestBody MetaSelMed metaSelMed) throws URISyntaxException {
        log.debug("REST request to update MetaSelMed : {}", metaSelMed);
        if (metaSelMed.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MetaSelMed result = metaSelMedRepository.save(metaSelMed);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, metaSelMed.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /meta-sel-meds} : get all the metaSelMeds.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of metaSelMeds in body.
     */
    @GetMapping("/meta-sel-meds")
    public List<MetaSelMed> getAllMetaSelMeds() {
        log.debug("REST request to get all MetaSelMeds");
        return metaSelMedRepository.findAll();
    }

    /**
     * {@code GET  /meta-sel-meds/:id} : get the "id" metaSelMed.
     *
     * @param id the id of the metaSelMed to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the metaSelMed, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/meta-sel-meds/{id}")
    public ResponseEntity<MetaSelMed> getMetaSelMed(@PathVariable Long id) {
        log.debug("REST request to get MetaSelMed : {}", id);
        Optional<MetaSelMed> metaSelMed = metaSelMedRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(metaSelMed);
    }

    /**
     * {@code DELETE  /meta-sel-meds/:id} : delete the "id" metaSelMed.
     *
     * @param id the id of the metaSelMed to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/meta-sel-meds/{id}")
    public ResponseEntity<Void> deleteMetaSelMed(@PathVariable Long id) {
        log.debug("REST request to delete MetaSelMed : {}", id);
        metaSelMedRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
