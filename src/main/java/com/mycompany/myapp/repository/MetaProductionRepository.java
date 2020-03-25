package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.MetaProduction;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the MetaProduction entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MetaProductionRepository extends JpaRepository<MetaProduction, Long> {
}
