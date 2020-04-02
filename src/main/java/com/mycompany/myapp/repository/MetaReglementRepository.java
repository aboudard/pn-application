package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.MetaReglement;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the MetaReglement entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MetaReglementRepository extends JpaRepository<MetaReglement, Long> {
}
