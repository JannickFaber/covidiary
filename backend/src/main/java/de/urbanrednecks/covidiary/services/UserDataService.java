package de.urbanrednecks.covidiary.services;

import de.urbanrednecks.covidiary.dtos.UserDto;
import de.urbanrednecks.covidiary.dtos.WeekResultDto;
import de.urbanrednecks.covidiary.entities.UserMapper;
import de.urbanrednecks.covidiary.entities.WeekResult;
import de.urbanrednecks.covidiary.repositories.UserRepository;
import de.urbanrednecks.covidiary.repositories.WeekResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class UserDataService {

    private final UserRepository userRepository;
    private final WeekResultRepository weekResultRepository;

    @Autowired
    public UserDataService(UserRepository userRepository, WeekResultRepository weekResultRepository) {
        this.userRepository = userRepository;
        this.weekResultRepository = weekResultRepository;
    }

    public UserDto saveWeeklyScore(String uuid, WeekResultDto dto) {
        if (dto != null) {
            WeekResult weekResult = new WeekResult();
            weekResult.setLocationScore(weekResult.getLocationScore());
            weekResult.setContactScore(weekResult.getContactScore());
            weekResult.setFirstDay(LocalDate.now().with(DayOfWeek.MONDAY));
            UserMapper user = userRepository.findByObjectId(uuid);
            if (user != null) {
                WeekResult toUpdate = user.getWeekResults().stream()
                        .filter(result -> result.getFirstDay().equals(weekResult.getFirstDay())).findFirst().orElse(null);
                if (toUpdate == null) {
                    user.addToWeekResults(weekResult);
                    userRepository.save(user);
                } else {
                    toUpdate.setContactScore(weekResult.getContactScore());
                    toUpdate.setLocationScore(weekResult.getLocationScore());
                    weekResultRepository.save(toUpdate);
                }
            } else {
                user = new UserMapper();
                user.addToWeekResults(weekResult);
                user = userRepository.save(user);
            }
            return new UserDto(user.getObjectId());
        }
        return null;
    }

    public WeekResultDto getWeeklyScore(LocalDate firstDayOfWeek) {
        if (firstDayOfWeek.getDayOfWeek().equals(DayOfWeek.MONDAY)) {
            WeekResultDto dto = new WeekResultDto();
            if (weekResultRepository.count() == 0) {
                dto.setLocationScore(0);
                dto.setContactScore(0);
            } else {
                List<WeekResult> filteredResults = StreamSupport.stream(weekResultRepository.findAll().spliterator(), false)
                        .filter(weekResult -> weekResult.getFirstDay().equals(firstDayOfWeek)).collect(Collectors.toList());

                double locationSum = filteredResults.stream().mapToDouble(WeekResult::getContactScore).sum();
                dto.setLocationScore(locationSum / StreamSupport.stream(weekResultRepository.findAll().spliterator(), false)
                        .filter(weekResult -> weekResult.getFirstDay().equals(firstDayOfWeek)).count());

                double contactScore = filteredResults.stream().mapToDouble(WeekResult::getLocationScore).sum();
                dto.setContactScore(contactScore / StreamSupport.stream(weekResultRepository.findAll().spliterator(), false)
                        .filter(weekResult -> weekResult.getFirstDay().equals(firstDayOfWeek)).count());
            }
            return dto;
        } else {
            throw new IllegalArgumentException("firstDayOfWeek must be a monday. " + firstDayOfWeek + " is a " + firstDayOfWeek.getDayOfWeek());
        }
    }

    public WeekResultDto getGlobalScore() {
        WeekResultDto dto = new WeekResultDto();
        if (weekResultRepository.count() == 0) {
            dto.setContactScore(0);
            dto.setLocationScore(0);
        } else {
            double locationSum = StreamSupport.stream(weekResultRepository.findAll().spliterator(), false)
                    .mapToDouble(WeekResult::getLocationScore).sum();
            dto.setLocationScore(locationSum / weekResultRepository.count());
            double contactSum = StreamSupport.stream(weekResultRepository.findAll().spliterator(), false)
                    .mapToDouble(WeekResult::getContactScore).sum();
            dto.setLocationScore(contactSum / weekResultRepository.count());
        }
        return dto;
    }
}
