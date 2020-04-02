package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.MetaSIRH;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the MetaSIRH entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MetaSIRHRepository extends JpaRepository<MetaSIRH, Long> {
}
