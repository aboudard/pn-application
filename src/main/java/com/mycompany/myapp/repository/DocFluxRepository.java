package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.DocFlux;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the DocFlux entity.
 */
@Repository
public interface DocFluxRepository extends JpaRepository<DocFlux, Long> {

    @Query(value = "select distinct docFlux from DocFlux docFlux left join fetch docFlux.idEditions",
        countQuery = "select count(distinct docFlux) from DocFlux docFlux")
    Page<DocFlux> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct docFlux from DocFlux docFlux left join fetch docFlux.idEditions")
    List<DocFlux> findAllWithEagerRelationships();

    @Query("select docFlux from DocFlux docFlux left join fetch docFlux.idEditions where docFlux.id =:id")
    Optional<DocFlux> findOneWithEagerRelationships(@Param("id") Long id);
}
