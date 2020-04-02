package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class MetaCoherisTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MetaCoheris.class);
        MetaCoheris metaCoheris1 = new MetaCoheris();
        metaCoheris1.setId(1L);
        MetaCoheris metaCoheris2 = new MetaCoheris();
        metaCoheris2.setId(metaCoheris1.getId());
        assertThat(metaCoheris1).isEqualTo(metaCoheris2);
        metaCoheris2.setId(2L);
        assertThat(metaCoheris1).isNotEqualTo(metaCoheris2);
        metaCoheris1.setId(null);
        assertThat(metaCoheris1).isNotEqualTo(metaCoheris2);
    }
}
