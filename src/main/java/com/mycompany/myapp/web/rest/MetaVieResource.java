package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.MetaVie;
import com.mycompany.myapp.repository.MetaVieRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.MetaVie}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MetaVieResource {

    private final Logger log = LoggerFactory.getLogger(MetaVieResource.class);

    private static final String ENTITY_NAME = "metaVie";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MetaVieRepository metaVieRepository;

    public MetaVieResource(MetaVieRepository metaVieRepository) {
        this.metaVieRepository = metaVieRepository;
    }

    /**
     * {@code POST  /meta-vies} : Create a new metaVie.
     *
     * @param metaVie the metaVie to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new metaVie, or with status {@code 400 (Bad Request)} if the metaVie has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/meta-vies")
    public ResponseEntity<MetaVie> createMetaVie(@RequestBody MetaVie metaVie) throws URISyntaxException {
        log.debug("REST request to save MetaVie : {}", metaVie);
        if (metaVie.getId() != null) {
            throw new BadRequestAlertException("A new metaVie cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MetaVie result = metaVieRepository.save(metaVie);
        return ResponseEntity.created(new URI("/api/meta-vies/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /meta-vies} : Updates an existing metaVie.
     *
     * @param metaVie the metaVie to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated metaVie,
     * or with status {@code 400 (Bad Request)} if the metaVie is not valid,
     * or with status {@code 500 (Internal Server Error)} if the metaVie couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/meta-vies")
    public ResponseEntity<MetaVie> updateMetaVie(@RequestBody MetaVie metaVie) throws URISyntaxException {
        log.debug("REST request to update MetaVie : {}", metaVie);
        if (metaVie.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MetaVie result = metaVieRepository.save(metaVie);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, metaVie.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /meta-vies} : get all the metaVies.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of metaVies in body.
     */
    @GetMapping("/meta-vies")
    public List<MetaVie> getAllMetaVies() {
        log.debug("REST request to get all MetaVies");
        return metaVieRepository.findAll();
    }

    /**
     * {@code GET  /meta-vies/:id} : get the "id" metaVie.
     *
     * @param id the id of the metaVie to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the metaVie, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/meta-vies/{id}")
    public ResponseEntity<MetaVie> getMetaVie(@PathVariable Long id) {
        log.debug("REST request to get MetaVie : {}", id);
        Optional<MetaVie> metaVie = metaVieRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(metaVie);
    }

    /**
     * {@code DELETE  /meta-vies/:id} : delete the "id" metaVie.
     *
     * @param id the id of the metaVie to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/meta-vies/{id}")
    public ResponseEntity<Void> deleteMetaVie(@PathVariable Long id) {
        log.debug("REST request to delete MetaVie : {}", id);
        metaVieRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
