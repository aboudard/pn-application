package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class MetaVieTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MetaVie.class);
        MetaVie metaVie1 = new MetaVie();
        metaVie1.setId(1L);
        MetaVie metaVie2 = new MetaVie();
        metaVie2.setId(metaVie1.getId());
        assertThat(metaVie1).isEqualTo(metaVie2);
        metaVie2.setId(2L);
        assertThat(metaVie1).isNotEqualTo(metaVie2);
        metaVie1.setId(null);
        assertThat(metaVie1).isNotEqualTo(metaVie2);
    }
}
