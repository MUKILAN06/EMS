package EMS.backend.repository;

import EMS.backend.entity.Issue;
import EMS.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface IssueRepository extends JpaRepository<Issue, Long> {
    List<Issue> findByAssignedTo(User user);
}
