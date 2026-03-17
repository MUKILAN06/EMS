package EMS.backend.dto;

import lombok.Builder;
import lombok.Data;
import java.util.Map;

@Data
@Builder
public class DashboardDTO {
    private long totalEmployees;
    private long pendingLeaves;
    private long activeTasks;
    private long resolvedIssues;
    private Map<String, Long> roleDistribution;
    private Map<String, Double> departmentSalaryAvg;
}
