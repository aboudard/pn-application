package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class MetaRecouvrementTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MetaRecouvrement.class);
        MetaRecouvrement metaRecouvrement1 = new MetaRecouvrement();
        metaRecouvrement1.setId(1L);
        MetaRecouvrement metaRecouvrement2 = new MetaRecouvrement();
        metaRecouvrement2.setId(metaRecouvrement1.getId());
        assertThat(metaRecouvrement1).isEqualTo(metaRecouvrement2);
        metaRecouvrement2.setId(2L);
        assertThat(metaRecouvrement1).isNotEqualTo(metaRecouvrement2);
        metaRecouvrement1.setId(null);
        assertThat(metaRecouvrement1).isNotEqualTo(metaRecouvrement2);
    }
}
