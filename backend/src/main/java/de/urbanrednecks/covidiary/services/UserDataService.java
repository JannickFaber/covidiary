package de.urbanrednecks.covidiary.services;

import de.urbanrednecks.covidiary.entities.UserMapper;
import de.urbanrednecks.covidiary.entities.WeekResult;
import de.urbanrednecks.covidiary.repositories.UserRepository;
import de.urbanrednecks.covidiary.repositories.WeekResultRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.UUID;
import java.util.stream.StreamSupport;

@Service
public class UserDataService {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserDataService.class);

    private final UserRepository userRepository;
    private final WeekResultRepository weekResultRepository;

    @Autowired
    public UserDataService(UserRepository userRepository, WeekResultRepository weekResultRepository) {
        this.userRepository = userRepository;
        this.weekResultRepository = weekResultRepository;
    }

    public String saveWeeklyScore(String uuid, WeekResult weekResult) {
        if (weekResult != null) {
            weekResult.setFirstDay(LocalDate.now().with(DayOfWeek.MONDAY));
            UserMapper user = userRepository.findByObjectId(uuid);
            if (user != null) {
                WeekResult toUpdate = user.getWeekResults().stream()
                        .filter(result -> result.getFirstDay().equals(weekResult.getFirstDay())).findFirst().orElse(null);
                System.out.println(toUpdate);
                if (toUpdate == null) {
                    user.addToWeekResults(weekResult);
                    userRepository.save(user);
                } else {
                    System.out.println(toUpdate.getId());
                    toUpdate.setContactScore(weekResult.getContactScore());
                    toUpdate.setLocationScore(weekResult.getLocationScore());
                    System.out.println(toUpdate.getId());
                    weekResultRepository.save(toUpdate);
                }
            } else {
                user = new UserMapper();
                user.addToWeekResults(weekResult);
                user = userRepository.save(user);
            }
            return user.getObjectId();
        }
        return null;
    }

    public double getLocationScore(LocalDate firstDayOfWeek) {
        double sum = StreamSupport.stream(weekResultRepository.findAll().spliterator(), false)
                .filter(weekResult -> weekResult.getFirstDay().equals(firstDayOfWeek))
                .mapToDouble(WeekResult::getLocationScore).sum();
        return sum / StreamSupport.stream(weekResultRepository.findAll().spliterator(), false)
                .filter(weekResult -> weekResult.getFirstDay().equals(firstDayOfWeek)).count();
    }

    public double getContactScore(LocalDate firstDayOfWeek) {
        double sum = StreamSupport.stream(weekResultRepository.findAll().spliterator(), false)
                .filter(weekResult -> weekResult.getFirstDay().equals(firstDayOfWeek))
                .mapToDouble(WeekResult::getContactScore).sum();
        return sum / StreamSupport.stream(weekResultRepository.findAll().spliterator(), false)
                .filter(weekResult -> weekResult.getFirstDay().equals(firstDayOfWeek)).count();
    }

    public double getLocationScore() {
        double sum = StreamSupport.stream(weekResultRepository.findAll().spliterator(), false)
                .mapToDouble(WeekResult::getLocationScore).sum();
        return sum / StreamSupport.stream(weekResultRepository.findAll().spliterator(), false).count();
    }

    public double getContactScore() {
        double sum = StreamSupport.stream(weekResultRepository.findAll().spliterator(), false)
                .mapToDouble(WeekResult::getContactScore).sum();
        return sum / StreamSupport.stream(weekResultRepository.findAll().spliterator(), false).count();
    }
}
