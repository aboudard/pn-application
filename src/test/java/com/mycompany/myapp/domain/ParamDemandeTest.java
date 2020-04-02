package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class ParamDemandeTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ParamDemande.class);
        ParamDemande paramDemande1 = new ParamDemande();
        paramDemande1.setId(1L);
        ParamDemande paramDemande2 = new ParamDemande();
        paramDemande2.setId(paramDemande1.getId());
        assertThat(paramDemande1).isEqualTo(paramDemande2);
        paramDemande2.setId(2L);
        assertThat(paramDemande1).isNotEqualTo(paramDemande2);
        paramDemande1.setId(null);
        assertThat(paramDemande1).isNotEqualTo(paramDemande2);
    }
}
