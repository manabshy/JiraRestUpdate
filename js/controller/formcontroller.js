
       
        var formApp = angular.module('formApp', []);

        // create angular controller and pass in $scope and $http
        function formController($scope, $http) {
         
          // create a blank object to hold our form information
          // $scope will allow this to pass between controller and view

            $scope.formData = {};
              

            $scope.createWordOrder= function(form) {

              //var url = 'http://localhost:9090/rest/api/2/issue/' + $('#woNumber option:selected').val() + '/';
              var url = base + 'issue/' + $('#woNumber option:selected').val() + '/';
              console.log('url to post the data:%s',url);

              var postData = 
                  {
                      "fields": {
                         "project":
                         { 
                            "key": "WO"
                         },
                         "summary": $('#operation').val(),
                         "description": $('#impact').val(),
                         "issuetype": {
                            "name": "Bug"
                         },

                          "assignee": {

                          "name": $('#email').val()

                          }
                     }
                  };
                var parameters = JSON.stringify(postData);
                  
                $.ajax({

                  url:url,
                  type: "PUT",
                  data: parameters,
                  
                  beforeSend: function(xhr){
                  
                  //xhr.setRequestHeader('Authorization', 'basic: '+make_base_auth("manabshy@gmail.com", "Online5759"));

                  },
                  
                    dataType: "json",
                    contentType: "application/json",
                    async: false,
                    success: function (issuedata) {
                      //console.log(issuedata);
                      $(function() {
                          $( "#dialog").text('WO updated in JIRA').css('color','#449d44');  
                          $("#dialog" ).dialog();
                      });

                    },
                    error: function(response) {
                      console.log(response.responseText);
                      alert("Error");
                    }
                });
            };
            $scope.reset=function(form){
              if (form) {
                console.log('reset form is valid');
                form.$setPristine();
                $scope.formData = {};

                //form.$setUntouched();
              }
              $scope.formData = angular.copy($scope.formData);
              $('#dialog').css("display","none");
                    
            };    
        }
        
    