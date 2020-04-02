package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class MetaSelMedTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MetaSelMed.class);
        MetaSelMed metaSelMed1 = new MetaSelMed();
        metaSelMed1.setId(1L);
        MetaSelMed metaSelMed2 = new MetaSelMed();
        metaSelMed2.setId(metaSelMed1.getId());
        assertThat(metaSelMed1).isEqualTo(metaSelMed2);
        metaSelMed2.setId(2L);
        assertThat(metaSelMed1).isNotEqualTo(metaSelMed2);
        metaSelMed1.setId(null);
        assertThat(metaSelMed1).isNotEqualTo(metaSelMed2);
    }
}
