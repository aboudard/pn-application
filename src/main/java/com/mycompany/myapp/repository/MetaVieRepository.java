package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.MetaVie;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the MetaVie entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MetaVieRepository extends JpaRepository<MetaVie, Long> {
}
