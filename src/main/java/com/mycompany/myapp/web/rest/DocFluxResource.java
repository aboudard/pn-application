package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.DocFlux;
import com.mycompany.myapp.repository.DocFluxRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.DocFlux}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DocFluxResource {

    private final Logger log = LoggerFactory.getLogger(DocFluxResource.class);

    private static final String ENTITY_NAME = "docFlux";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DocFluxRepository docFluxRepository;

    public DocFluxResource(DocFluxRepository docFluxRepository) {
        this.docFluxRepository = docFluxRepository;
    }

    /**
     * {@code POST  /doc-fluxes} : Create a new docFlux.
     *
     * @param docFlux the docFlux to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new docFlux, or with status {@code 400 (Bad Request)} if the docFlux has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/doc-fluxes")
    public ResponseEntity<DocFlux> createDocFlux(@RequestBody DocFlux docFlux) throws URISyntaxException {
        log.debug("REST request to save DocFlux : {}", docFlux);
        if (docFlux.getId() != null) {
            throw new BadRequestAlertException("A new docFlux cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DocFlux result = docFluxRepository.save(docFlux);
        return ResponseEntity.created(new URI("/api/doc-fluxes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /doc-fluxes} : Updates an existing docFlux.
     *
     * @param docFlux the docFlux to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated docFlux,
     * or with status {@code 400 (Bad Request)} if the docFlux is not valid,
     * or with status {@code 500 (Internal Server Error)} if the docFlux couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/doc-fluxes")
    public ResponseEntity<DocFlux> updateDocFlux(@RequestBody DocFlux docFlux) throws URISyntaxException {
        log.debug("REST request to update DocFlux : {}", docFlux);
        if (docFlux.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DocFlux result = docFluxRepository.save(docFlux);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, docFlux.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /doc-fluxes} : get all the docFluxes.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of docFluxes in body.
     */
    @GetMapping("/doc-fluxes")
    public List<DocFlux> getAllDocFluxes(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all DocFluxes");
        return docFluxRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /doc-fluxes/:id} : get the "id" docFlux.
     *
     * @param id the id of the docFlux to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the docFlux, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/doc-fluxes/{id}")
    public ResponseEntity<DocFlux> getDocFlux(@PathVariable Long id) {
        log.debug("REST request to get DocFlux : {}", id);
        Optional<DocFlux> docFlux = docFluxRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(docFlux);
    }

    /**
     * {@code DELETE  /doc-fluxes/:id} : delete the "id" docFlux.
     *
     * @param id the id of the docFlux to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/doc-fluxes/{id}")
    public ResponseEntity<Void> deleteDocFlux(@PathVariable Long id) {
        log.debug("REST request to delete DocFlux : {}", id);
        docFluxRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
