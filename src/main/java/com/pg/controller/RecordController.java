package com.pg.controller;

import com.pg.config.CurrentUser;
import com.pg.model.Record;
import com.pg.service.PrincipalDetails;
import com.pg.service.RecordService;
import com.pg.service.TakingLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class RecordController {
    final private TakingLogService takingLogService;

    final private RecordService recordService;

    // 대상 유저는 항상 로그인한 본인이다
    @GetMapping("/supplements/record")
    public Map<String, Integer> getContinuousDose(@CurrentUser PrincipalDetails currentUser){
        String nickname = currentUser.getNickname();
        List<Integer> pillList = takingLogService.selectTakingLogByUser(nickname);
        Map<String, Integer> record = new HashMap<>();
        int continuousDose = 0;
        int index = 0;
        for(int i = pillList.size() - 1; i >= 0; i--) {
            if(pillList.get(i) == 1) continuousDose++;
            else {
                index = i;
                break;
            }
        }

        int maxContinuousDose = continuousDose;
        int temp = 0;
        for(int i = index; i >= 0; i--) {
            if(pillList.get(i) == 1) temp++;
            else if(pillList.get(i) == 0 || i == 0){
                maxContinuousDose = temp > maxContinuousDose ? temp : maxContinuousDose;
                temp = 0;
            }
        }

        record.put("continuity", continuousDose);
        record.put("maxContinuity", maxContinuousDose);

        recordService.saveRecord(continuousDose, maxContinuousDose, nickname);

        return record;
    }

    @GetMapping("/supplements/ranking")
    public List<Record> rank() {
        return recordService.ranking();
    }

    @GetMapping("/supplements/maxranking")
    public List<Record> maxrank() {
        return recordService.maxraking();
    }


}
