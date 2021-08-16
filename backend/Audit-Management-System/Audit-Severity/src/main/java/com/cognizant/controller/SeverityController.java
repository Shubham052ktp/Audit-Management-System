package com.cognizant.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.fiegnclient.AuditBenchmarkFeignclient;
import com.cognizant.fiegnclient.AuditCheckListProxy;
import com.cognizant.fiegnclient.AuthClient;
import com.cognizant.pojo.AuditBenchmark;
import com.cognizant.pojo.AuditDetails;
import com.cognizant.pojo.AuditRequest;
import com.cognizant.pojo.AuditResponse;
import com.cognizant.pojo.AuditType;
import com.cognizant.pojo.QuestionsEntity;
import com.cognizant.service.AuditRequestResponse;
import com.cognizant.service.TokenService;

import lombok.extern.slf4j.Slf4j;

/**
 * 
 * This class is handling all the end points for Audit Checklist microservice. 
 * This controller has mappings as-
 * postmapping-auditSeverity()
 *
 */


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@Slf4j
public class SeverityController {
	
	@Autowired
	private AuditRequestResponse service;
	@Autowired
	AuthClient authClient;
	@Autowired
	AuditCheckListProxy checklistProxy;
	
	@Autowired
	TokenService tokenService;
	
	@Autowired
	Environment env;
	
	@Autowired
	AuditBenchmarkFeignclient auditBenchmarkFeignclient;
	/**
	 * 
	 * @param token
	 * @param auditRequest
	 * @return ResponseEntity<Response>
	 */
	@PostMapping("/ProjectExecutionStatus")
	public AuditResponse auditSeverity(@RequestHeader(name = "Authorization",required = true)String token,@RequestBody AuditRequest auditRequest) {
		int accNoAnswers = 0;
		int actualNoAnswers = 0;
		ResponseEntity<?> responseEntity = null;
		List<QuestionsEntity> questionsList = null;
		AuditResponse response = null;
		if (tokenService.checkTokenValidity(token)) {
			List<AuditBenchmark> benchmarkList = auditBenchmarkFeignclient.getBenchmarkMap(token).getBody();
			AuditDetails aDetails=auditRequest.getAuditDetails();
			for (AuditBenchmark benchmark : benchmarkList) {
				//auditRequest.getAuditDetails().getAuditType())
				if (benchmark.getAuditType().equalsIgnoreCase(aDetails.getAuditType())) {
					accNoAnswers = benchmark.getAccNoAnswers();
				}
			}
			AuditType auditType = new AuditType(auditRequest.getAuditDetails().getAuditType());
			questionsList = checklistProxy.getChecklist(token, auditType).getBody();
			/*QResponseModel qr = new QResponseModel();
			//storing responses
			qr.setR1(questionsList.get(0).getResponse());
			qr.setR2(questionsList.get(1).getResponse());
			qr.setR3(questionsList.get(2).getResponse());
			qr.setR4(questionsList.get(3).getResponse());
			qr.setR5(questionsList.get(4).getResponse());
			service.saveModel(qr);*/
			//
			for (QuestionsEntity answer : questionsList) {
				if (answer.getResponse().equalsIgnoreCase("No")) {
					actualNoAnswers++;
				}
			}

			if (actualNoAnswers <= accNoAnswers) {
				responseEntity = new ResponseEntity<AuditResponse>(new AuditResponse(
						env.getProperty("project.status.green"), env.getProperty("remedial.action.no")), HttpStatus.OK);
				response = (AuditResponse) responseEntity.getBody();
				service.saveResponse(response);
			} else if (auditRequest.getAuditDetails().getAuditType().equalsIgnoreCase("Internal")) {
				responseEntity = new ResponseEntity<AuditResponse>(
						new AuditResponse(env.getProperty("project.status.red"),
								env.getProperty("remedial.action.yes.one")),
						HttpStatus.OK);
				response = (AuditResponse) responseEntity.getBody();
				service.saveResponse(response);
			} else if (auditRequest.getAuditDetails().getAuditType().equalsIgnoreCase("SOX")) {
				responseEntity = new ResponseEntity<AuditResponse>(
						new AuditResponse(env.getProperty("project.status.red"),
								env.getProperty("remedial.action.yes.two")),
						HttpStatus.OK);
				response = (AuditResponse) responseEntity.getBody();
				service.saveResponse(response);
			}
			service.saveRequest(auditRequest);
			return response;
		} else {
			if(log.isInfoEnabled() && log.isErrorEnabled())
			{
				log.error(env.getProperty("string.token.exp"));
				log.info(env.getProperty("string.end"));				
			}

			responseEntity = new ResponseEntity<String>(env.getProperty("string.token.exp"), HttpStatus.FORBIDDEN);
			return response;
		}
}
	
}
