package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.MetaSelMed;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the MetaSelMed entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MetaSelMedRepository extends JpaRepository<MetaSelMed, Long> {
}
