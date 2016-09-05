searchVisible = 0;
transparent = true;

$(document).ready(function(){
    /*  Activate the tooltips      */
    $('[rel="tooltip"]').tooltip();
      
    $('.wizard-card').bootstrapWizard({
        'tabClass': 'nav nav-pills',
        'nextSelector': '.btn-next',
        'previousSelector': '.btn-previous',
         
         onInit : function(tab, navigation, index){
            
           //check number of tabs and fill the entire row
           var $total = navigation.find('li').length;
           $width = 100/$total;
           
           $display_width = $(document).width();
           
           if($display_width < 600 && $total > 3){
               $width = 50;
           }
           
           navigation.find('li').css('width',$width + '%');
           
        },
        onNext: function(tab, navigation, index){
            if(index == 1){
                return validateFirstStep();
            } else if(index == 2){
                return validateSecondStep();
            } else if(index == 3){
                return validateThirdStep();              
            } else if(index == 4){
            	return validateFourthStep();
            } else if(index == 5){
            	return validateFifthStep();
            }
            //etc. 
              
        },
        onTabClick : function(tab, navigation, index){
            // Disable the posibility to click on tabs
            return false;
        }, 
        onTabShow: function(tab, navigation, index) {
            var $total = navigation.find('li').length;
            var $current = index+1;
            
            var wizard = navigation.closest('.wizard-card');
            
            // If it's the last tab then hide the last button and show the finish instead
            if($current >= $total) {
                $(wizard).find('.btn-next').hide();
                $(wizard).find('.btn-finish').show();
            } else {
                $(wizard).find('.btn-next').show();
                $(wizard).find('.btn-finish').hide();
            }
        }
    });

    // Prepare the preview for profile picture
    $("#wizard-picture").change(function(){
        readURL(this);
    });
    
    $('[data-toggle="wizard-radio"]').click(function(){
        wizard = $(this).closest('.wizard-card');
        wizard.find('[data-toggle="wizard-radio"]').removeClass('active');
        $(this).addClass('active');
        $(wizard).find('[type="radio"]').removeAttr('checked');
        $(this).find('[type="radio"]').attr('checked','true');
    });
    
    $('[data-toggle="wizard-checkbox"]').click(function(){
        if( $(this).hasClass('active')){
            $(this).removeClass('active');
            $(this).find('[type="checkbox"]').removeAttr('checked');
        } else {
            $(this).addClass('active');
            $(this).find('[type="checkbox"]').attr('checked','true');
        }
    });
    
    $height = $(document).height();
    $('.set-full-height').css('height',$height);
    
    
});

function validateFirstStep(){
    
    $(".wizard-card form").validate({
		rules: {
			firstname: "required",
			lastname: "required",
            //city: "required",
            //price:"required",
            //country: "required",
            //person: "required",
            username: {
                required: true,
                minlength: 5
            },
			email: {
				required: true,
				email: true
			},
			password: {
				required: true,
				minlength: 5
			},
			confirm_password: {
				required: true,
				minlength: 5,
				equalTo: "#passwordSignUp"
			},
			h_location: "required",
			price: "required",
		},
/*  other possible input validations
			,username: {
				required: true,
				minlength: 2
			},
			password: {
				required: true,
				minlength: 5
			},
			confirm_password: {
				required: true,
				minlength: 5,
				equalTo: "#password"
			},
		
			topic: {
				required: "#newsletter:checked",
				minlength: 2
			},
			agree: "required"
*/			

		messages: {
			firstname: "Please enter your First Name",
			lastname: "Please enter your Last Name",
            //city: "please enter a city name",
            //price: "please enter your rental price",
            //country: "please select country",
            //person: "please select persons",
            username: {
                required: "Please enter a username",
                minlength: "Your username must consist of at least 2 characters"
            },
			email: "Please enter a valid email address",
			password: {
				required: "Please provide a password",
				minlength: "Your password must be at least 5 characters long"
			},
			confirm_password: {
				required: "Please provide a password",
				minlength: "Your password must be at least 5 characters long",
				equalTo: "Please enter the same password as above"
			},
			h_location: "Please enter a valide address",
			price: "please enter price",


/*   other posible validation messages
			username: {
				required: "Please enter a username",
				minlength: "Your username must consist of at least 2 characters"
			},
			password: {
				required: "Please provide a password",
				minlength: "Your password must be at least 5 characters long"
			},
			confirm_password: {
				required: "Please provide a password",
				minlength: "Your password must be at least 5 characters long",
				equalTo: "Please enter the same password as above"
			},
			email: "Please enter a valid email address",
			agree: "Please accept our policy",
			topic: "Please select at least 2 topics"
*/
				
		}
	}); 
	
	if(!$(".wizard-card form").valid()){
    	//form is invalid
    	return false;
	}
	
	return true;
}

function validateSecondStep(){
   
    //code here for second step
    $(".wizard-card form").validate({
		rules: {
            firstname: "required",
            lastname: "required",
            type: "required",
            
            
		},
		messages: {
			firstname: "Please enter your First Name",
            lastname: "Please enter your Last Name",
            type: "Please select your property type",
		}
	}); 
	
	if(!$(".wizard-card form").valid()){
    	console.log('invalid');
    	return false;
	}
	return true;
    
}

function validateThirdStep(){
	$(".wizard-card form").validate({
		rules: {
			housetype: "required",
			roomtype: "required",
			sex: "required",
		},
		messages: {
			housetype: "Please select house/apartment type",
			roomtype: "Please select room type",
			sex: "Please select your gender",
		}
		
	});
	if(!$(".wizard-card form").valid()){
    	console.log('invalid');
    	return false;
	}
	return true;
    //code here for third step
    
    
}
function validateFourthStep(){
	$(".wizard-card form").validate({
		rules: {
			title: "required",
			houseinfo: "required",
			
		},
		messages: {
			title: "Please input a title",
			houseinfo: "please write your description",
			
		}
		
	});
	if(!$(".wizard-card form").valid()){
    	console.log('invalid');
    	return false;
	}
	return true;
    //code here for third step
    
    
}
function validateFifthStep(){
	$(".wizard-card form").validate({
		rules: {
			phonenumber:"required",
			email: "required",
			
		},
		messages: {
			phonenumber: "Please enter your phone number",
			email: "please enter your email address",
			
		}
		
	});
	if(!$(".wizard-card form").valid()){
    	console.log('invalid');
    	return false;
	}
	return true;
    //code here for third step
    
    
}

 //Function to show image before upload

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
        }
        reader.readAsDataURL(input.files[0]);
    }
}
    












