package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.MetaRecouvrement;
import com.mycompany.myapp.repository.MetaRecouvrementRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.MetaRecouvrement}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MetaRecouvrementResource {

    private final Logger log = LoggerFactory.getLogger(MetaRecouvrementResource.class);

    private static final String ENTITY_NAME = "metaRecouvrement";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MetaRecouvrementRepository metaRecouvrementRepository;

    public MetaRecouvrementResource(MetaRecouvrementRepository metaRecouvrementRepository) {
        this.metaRecouvrementRepository = metaRecouvrementRepository;
    }

    /**
     * {@code POST  /meta-recouvrements} : Create a new metaRecouvrement.
     *
     * @param metaRecouvrement the metaRecouvrement to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new metaRecouvrement, or with status {@code 400 (Bad Request)} if the metaRecouvrement has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/meta-recouvrements")
    public ResponseEntity<MetaRecouvrement> createMetaRecouvrement(@RequestBody MetaRecouvrement metaRecouvrement) throws URISyntaxException {
        log.debug("REST request to save MetaRecouvrement : {}", metaRecouvrement);
        if (metaRecouvrement.getId() != null) {
            throw new BadRequestAlertException("A new metaRecouvrement cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MetaRecouvrement result = metaRecouvrementRepository.save(metaRecouvrement);
        return ResponseEntity.created(new URI("/api/meta-recouvrements/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /meta-recouvrements} : Updates an existing metaRecouvrement.
     *
     * @param metaRecouvrement the metaRecouvrement to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated metaRecouvrement,
     * or with status {@code 400 (Bad Request)} if the metaRecouvrement is not valid,
     * or with status {@code 500 (Internal Server Error)} if the metaRecouvrement couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/meta-recouvrements")
    public ResponseEntity<MetaRecouvrement> updateMetaRecouvrement(@RequestBody MetaRecouvrement metaRecouvrement) throws URISyntaxException {
        log.debug("REST request to update MetaRecouvrement : {}", metaRecouvrement);
        if (metaRecouvrement.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MetaRecouvrement result = metaRecouvrementRepository.save(metaRecouvrement);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, metaRecouvrement.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /meta-recouvrements} : get all the metaRecouvrements.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of metaRecouvrements in body.
     */
    @GetMapping("/meta-recouvrements")
    public List<MetaRecouvrement> getAllMetaRecouvrements() {
        log.debug("REST request to get all MetaRecouvrements");
        return metaRecouvrementRepository.findAll();
    }

    /**
     * {@code GET  /meta-recouvrements/:id} : get the "id" metaRecouvrement.
     *
     * @param id the id of the metaRecouvrement to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the metaRecouvrement, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/meta-recouvrements/{id}")
    public ResponseEntity<MetaRecouvrement> getMetaRecouvrement(@PathVariable Long id) {
        log.debug("REST request to get MetaRecouvrement : {}", id);
        Optional<MetaRecouvrement> metaRecouvrement = metaRecouvrementRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(metaRecouvrement);
    }

    /**
     * {@code DELETE  /meta-recouvrements/:id} : delete the "id" metaRecouvrement.
     *
     * @param id the id of the metaRecouvrement to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/meta-recouvrements/{id}")
    public ResponseEntity<Void> deleteMetaRecouvrement(@PathVariable Long id) {
        log.debug("REST request to delete MetaRecouvrement : {}", id);
        metaRecouvrementRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
