SectionManager = function(sections, singleInstance) {
	this.sections = {};
	this.singleInstance = typeof singleinstance !=='undefined' ? singleInstance: true;
	for (i=0;i<sections.length;i++){
		this.add(sections[i]);
	}
};
SectionManager.prototype = {
	
	add : function(name) {
		//console.log('stuff');
		var section = {
			running : false,
			initialised :false
		}
			
		this.sections[name] = section;
	},
	
	remove : function(name) {
		delete this.sections[name];	
	},
	
	isRunning : function(section) {
		if (this.sections[section].running) {
			return true;
		} else {
			return false;
		}
	},

	currentSection : function() {
		if (this.singleInstance) {
			for (var index in this.sections){
				if (this.sections[index].running){
					return index;
				}
			}		
		}
	},
	
	init : function(section) {
		this.sections[section].initialised = true;
	},

	start : function(section) {
		if (this.singleInstance) {
			for (var index in this.sections){
				console.log(index);
				//if(this.section.hasOwnProperty(index)){
					this.sections[index].running = false;
				//}
			}
		}
		this.sections[section].running = true;
	},

	stop : function(section) {
		this.sections[section].running = false;
	},

	reset : function(section) {
		this.sections[section].running = false;
		this.sections[section].initialised = false;
	},
	
	toggle : function(section) {
		if (this.running) {
			this.sections[section].running = false;
			return false;
		} else {
			this.sections[section].running = true;
			return true;
		}
	}
}