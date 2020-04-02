package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class MetaReglementTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MetaReglement.class);
        MetaReglement metaReglement1 = new MetaReglement();
        metaReglement1.setId(1L);
        MetaReglement metaReglement2 = new MetaReglement();
        metaReglement2.setId(metaReglement1.getId());
        assertThat(metaReglement1).isEqualTo(metaReglement2);
        metaReglement2.setId(2L);
        assertThat(metaReglement1).isNotEqualTo(metaReglement2);
        metaReglement1.setId(null);
        assertThat(metaReglement1).isNotEqualTo(metaReglement2);
    }
}
