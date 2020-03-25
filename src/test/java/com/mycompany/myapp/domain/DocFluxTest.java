package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class DocFluxTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DocFlux.class);
        DocFlux docFlux1 = new DocFlux();
        docFlux1.setId(1L);
        DocFlux docFlux2 = new DocFlux();
        docFlux2.setId(docFlux1.getId());
        assertThat(docFlux1).isEqualTo(docFlux2);
        docFlux2.setId(2L);
        assertThat(docFlux1).isNotEqualTo(docFlux2);
        docFlux1.setId(null);
        assertThat(docFlux1).isNotEqualTo(docFlux2);
    }
}
