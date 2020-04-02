package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.MetaRecouvrement;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the MetaRecouvrement entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MetaRecouvrementRepository extends JpaRepository<MetaRecouvrement, Long> {
}
