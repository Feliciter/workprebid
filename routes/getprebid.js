var express = require('express');
var router = express.Router();
var path = require('path');
var mime = require('mime');
var fs = require('fs');



/// Get Today Date normalize
var y = new Date();
var daytoday;
formatDate(y);

  function formatDate(jsDate){
     return daytoday=(jsDate.getDate()<10?("0"+jsDate.getDate()):jsDate.getDate()) + "." + 
        ((jsDate.getMonth()+1)<10?("0"+(jsDate.getMonth()+1)):(jsDate.getMonth()+1)) + "." + 
        jsDate.getFullYear()
    
  }


/* GET users listing. */
router.post('/', function(req, res, next) {

  const postCriteo  = req.body.criteo;
  //console.log('Criteo  '+postCriteo );

  const postRubicon  = req.body.rubicon;
  //console.log('Rubicon '+postRubicon );

  const postAppNexus  = req.body.appNexus;
  //console.log('AppNexus '+postAppNexus );


  
  
    //postCriteo
    if (postCriteo ==='on' && postRubicon !=='on' &&  postAppNexus !=='on'  ){
      //console.log('Criteo is active  '+postCriteo );    
      drivefile(1,'criteoBidAdapter-min.js')
      
    }

    //postRubicon 
    if (postCriteo !=='on' && postRubicon ==='on' &&  postAppNexus !=='on'  ){
     // console.log('postRubicon  is active  '+postRubicon  );
      drivefile(2,'rubiconBidAdapter-min.js')   
    }

    //postAppNexus
    if (postCriteo !=='on' && postRubicon !=='on' &&  postAppNexus ==='on' ){
      //console.log('postAppNexus is active  '+postAppNexus  );
      drivefile(3,'appnexusBidAdapter-min.js')     
    }

      ////combine 2

        //postCriteo & postRubicon
        if (postCriteo ==='on' && postRubicon ==='on' &&  postAppNexus !=='on'  ){
         // console.log('Criteo + Rubicon is active  '+postCriteo );
          drivefile(4,'criteo_rubicon-min.js')      
        }
    
        //postRubicon & postAppNexus
        if (postCriteo !=='on' && postRubicon ==='on' &&  postAppNexus ==='on'  ){
         // console.log('postRubicon + postAppNexus  is active  '+postRubicon  );
          drivefile(6,'appnexus_rubicon-min.js')      
        }
    
        //postAppNexus & postCriteo
        if (postCriteo ==='on' && postRubicon !=='on' &&  postAppNexus ==='on' ){
         // console.log('postAppNexus + postCriteo is active  '+postAppNexus  );
          drivefile(5,'criteo_appnexus-min.js')      
        }

        /// combine all

        //postAppNexus & postCriteo & postRubicon
        if (postCriteo ==='on' && postRubicon ==='on' &&  postAppNexus ==='on' ){
        //  console.log('all is active  ' );
          drivefile(7,'criteo_appnexus_rubicon-min.js')   
          
        }


  function drivefile(cat,file ) {

    fs.copyFile(path.join((process.cwd()+'/'+'files'+'/'+cat),file), path.join((process.cwd()+'/'+'files'+'/'+'done'),daytoday+'_prebid.js'), (err) => {
      if (err) throw err;
    //  console.log(' was copied to destination');
    });
    ///

     file =path.join((process.cwd()+'/'+'files'+'/'+'done'),daytoday+'_prebid.js');
    var filename = path.basename(file);
    var mimetype = mime.lookup(file);
    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.setHeader('Content-type', mimetype);
    var filestream = fs.createReadStream(file);
    return filestream.pipe(res);

    }      


});

module.exports = router;

