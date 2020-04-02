package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.MetaSIRH;
import com.mycompany.myapp.repository.MetaSIRHRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.MetaSIRH}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MetaSIRHResource {

    private final Logger log = LoggerFactory.getLogger(MetaSIRHResource.class);

    private static final String ENTITY_NAME = "metaSIRH";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MetaSIRHRepository metaSIRHRepository;

    public MetaSIRHResource(MetaSIRHRepository metaSIRHRepository) {
        this.metaSIRHRepository = metaSIRHRepository;
    }

    /**
     * {@code POST  /meta-sirhs} : Create a new metaSIRH.
     *
     * @param metaSIRH the metaSIRH to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new metaSIRH, or with status {@code 400 (Bad Request)} if the metaSIRH has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/meta-sirhs")
    public ResponseEntity<MetaSIRH> createMetaSIRH(@RequestBody MetaSIRH metaSIRH) throws URISyntaxException {
        log.debug("REST request to save MetaSIRH : {}", metaSIRH);
        if (metaSIRH.getId() != null) {
            throw new BadRequestAlertException("A new metaSIRH cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MetaSIRH result = metaSIRHRepository.save(metaSIRH);
        return ResponseEntity.created(new URI("/api/meta-sirhs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /meta-sirhs} : Updates an existing metaSIRH.
     *
     * @param metaSIRH the metaSIRH to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated metaSIRH,
     * or with status {@code 400 (Bad Request)} if the metaSIRH is not valid,
     * or with status {@code 500 (Internal Server Error)} if the metaSIRH couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/meta-sirhs")
    public ResponseEntity<MetaSIRH> updateMetaSIRH(@RequestBody MetaSIRH metaSIRH) throws URISyntaxException {
        log.debug("REST request to update MetaSIRH : {}", metaSIRH);
        if (metaSIRH.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MetaSIRH result = metaSIRHRepository.save(metaSIRH);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, metaSIRH.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /meta-sirhs} : get all the metaSIRHS.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of metaSIRHS in body.
     */
    @GetMapping("/meta-sirhs")
    public List<MetaSIRH> getAllMetaSIRHS() {
        log.debug("REST request to get all MetaSIRHS");
        return metaSIRHRepository.findAll();
    }

    /**
     * {@code GET  /meta-sirhs/:id} : get the "id" metaSIRH.
     *
     * @param id the id of the metaSIRH to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the metaSIRH, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/meta-sirhs/{id}")
    public ResponseEntity<MetaSIRH> getMetaSIRH(@PathVariable Long id) {
        log.debug("REST request to get MetaSIRH : {}", id);
        Optional<MetaSIRH> metaSIRH = metaSIRHRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(metaSIRH);
    }

    /**
     * {@code DELETE  /meta-sirhs/:id} : delete the "id" metaSIRH.
     *
     * @param id the id of the metaSIRH to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/meta-sirhs/{id}")
    public ResponseEntity<Void> deleteMetaSIRH(@PathVariable Long id) {
        log.debug("REST request to delete MetaSIRH : {}", id);
        metaSIRHRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
