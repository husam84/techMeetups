DashboardController = AppController.extend({
  waitOn: function() {
    return this.subscribe('mymeetups');
  }
  /*,
  data: {
    items: Items.find({})
  },
  onAfterAction: function () {
    Meta.setTitle('Dashboard');
  }*/
});

DashboardController.helpers({
	'mymeetups' : function(){
		return Meetups.find({user : Meteor.userId()})
	}
});

DashboardController.events({
  /*'click [data-action=doSomething]': function (event, template) {
    event.preventDefault();
  }*/
  
  'submit .update-meetup-form': function(event){
	  var title 	= event.target.title.value;
	  var email 	= event.target.email.value;
	  var topics 	= event.target.topics.value;
	  var type 		= event.target.type.value;
	  var address 	= event.target.address.value;
	  var city 		= event.target.city.value;
	  var state 	= event.target.state.value;
	  var postcode	= event.target.postcode.value;
	  var meetupdate = event.target.meetupdate.value;
	  var id 		= event.target.id.value;
	
	
	var params = {
		title  	: title,
	    email 	: email,
        topics 	: topics,
        type 	: type,
        address : address,
        city 	: city,
        state 	: state,
        postcode	: postcode,
        meetupdate:	 meetupdate,
		updatedAt	: new Date()
	}
  	
	
	Meteor.call('updateMeetup', id, params);
	
	toastr.success('Meetup was updated successfully');
		
	Router.go('/meetups');
	
	
	return false;
	}, 
		'click .remove-meetup': function(event){
			if(confirm("Are you sure you want to remove this meetup?")){
				Meteor.call('removeMeetup', event.currentTarget.id);
				toastr.success('Meetup was removed successfully');
				return false;
			}
	}
});
