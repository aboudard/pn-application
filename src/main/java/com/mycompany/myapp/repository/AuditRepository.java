package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Audit;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Audit entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AuditRepository extends JpaRepository<Audit, Long> {
}
