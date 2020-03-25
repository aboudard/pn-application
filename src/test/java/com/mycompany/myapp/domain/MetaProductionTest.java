package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class MetaProductionTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MetaProduction.class);
        MetaProduction metaProduction1 = new MetaProduction();
        metaProduction1.setId(1L);
        MetaProduction metaProduction2 = new MetaProduction();
        metaProduction2.setId(metaProduction1.getId());
        assertThat(metaProduction1).isEqualTo(metaProduction2);
        metaProduction2.setId(2L);
        assertThat(metaProduction1).isNotEqualTo(metaProduction2);
        metaProduction1.setId(null);
        assertThat(metaProduction1).isNotEqualTo(metaProduction2);
    }
}
