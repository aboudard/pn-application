package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.MetaCoheris;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the MetaCoheris entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MetaCoherisRepository extends JpaRepository<MetaCoheris, Long> {
}
