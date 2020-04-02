package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class MetaSIRHTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MetaSIRH.class);
        MetaSIRH metaSIRH1 = new MetaSIRH();
        metaSIRH1.setId(1L);
        MetaSIRH metaSIRH2 = new MetaSIRH();
        metaSIRH2.setId(metaSIRH1.getId());
        assertThat(metaSIRH1).isEqualTo(metaSIRH2);
        metaSIRH2.setId(2L);
        assertThat(metaSIRH1).isNotEqualTo(metaSIRH2);
        metaSIRH1.setId(null);
        assertThat(metaSIRH1).isNotEqualTo(metaSIRH2);
    }
}
