package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.ParamDemande;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ParamDemande entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ParamDemandeRepository extends JpaRepository<ParamDemande, Long> {
}
