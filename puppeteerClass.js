import { keywords, msg, myquery, pagno, subjectss } from "./msg.js";

export const leadFilter = async (seniorityLevel, industry, geography, page) => {

    await page.setDefaultTimeout(100000);
    await page.goto(
      `https://www.linkedin.com/search/results/${myquery}/?keywords=${keywords}&origin=SWITCH_SEARCH_VERTICAL&page=${pagno}&sid=hK1`
    );

    await page.waitForTimeout(7000);
    console.log("going to main funct")

  

  let pagination=true


  while (pagination) {
    try {

      let Pexists=await page.evaluate(async() => {
        let nextButton=document.querySelector('[aria-label="Next"]'); // Replace with the actual selector of the "Next" button
       return pagination = nextButton && !nextButton.hasAttribute("disabled");
       
      // msg 
  
     
     
     
    });
    if (pagination) {
  
     await Mymsgs(page)
  
     await page.waitForTimeout(6000)
     try {
       await page.evaluate(async(page) => {
        let nextButton=document.querySelector('[aria-label="Next"]'); // Replace with the actual selector of the "Next" button
        nextButton.click()
        
      });
      
     } catch (error) {
      console.log("you dont have inmail more credit")
      
     }
    
  
    await page.waitForNavigation({ timeout: 100000 });
      
    
     }
      
      // console.log(lenghths.length)
      
  
  
  
  
  
  
  
  
      if (!pagination) {
        console.log("Pagination disabled.");
        break;
      }
    
      // Add a delay between clicks to avoid overwhelming the server
      await page.waitForTimeout(1000); // Adjust the delay as needed
      
    } catch (err) {
      console.log("the Prbm is from line 73",err.message)
      
      
    }
  
  }
        
      

      // let liOfpage = await page.evaluate(() => {
      //   let allli = Array.from(document.querySelectorAll("ul.reusable-search__entity-result-list .reusable-search__result-container")).map((x) => {
      //     return x.href;
      //   });
      //   return allli;
      // });
      
      // console.log('Number of list items:', liOfpage);
    

 
};

const Mymsgs=async(page)=>{
  await page.waitForTimeout(6000)
  try{
 await page.evaluate(()=>{
     const parentElementexist = document.querySelector('.msg-convo-wrapper')!==null;
     if (parentElementexist) {
       let parentElement = document.querySelector('.msg-convo-wrapper')
       const closeButton = parentElement.querySelector('[type="close"]')!==null;
       if (closeButton) {
         parentElement.querySelector('[type="close"]').click()
         
       }
       
       
     }

  })

 }catch(err){
   console.log("perfect no cov opened already")
 }





await page.waitForTimeout(4000)
let liOfpage = await page.evaluate(async() => {
    let existtext =  Array.from(document.querySelectorAll("ul.reusable-search__entity-result-list .reusable-search__result-container")).filter((x) => {
        let existmsg =  x.querySelector("span.artdeco-button__text") !== null;
        return existmsg;
    }).map((x) => {
        return x.querySelector(".entity-result__title-text > a").href
    });
    return existtext;
});
      
     
console.log(liOfpage)
  await page.waitForTimeout(4000)
   if (liOfpage.length>0) {
     await Profilemsgpage(page,liOfpage)
    return
   }



}



const Profilemsgpage=async(page,list)=>{
  
  for (const x of list) {
    await page.goto(x)
    await page.waitForTimeout(7000)
  
    await page.waitForSelector('.entry-point',{timeout:80000});
    // try {
    
      await page.evaluate(()=>{
        let ifinMailexist=document.querySelector('[type="send-privately"]')!==null;
        if (ifinMailexist) {
          document.querySelector('[type="send-privately"]').click()
          
        }
      })
      await page.waitForTimeout(7000)
    // } catch (error) {
    //   console.log("you cant send msg becouse you dont have Inmail anymore in send privately msg line 135",error.message)
      
    // }
    // // await page.evaluate(()=>{
    //   document.querySelector(".entry-point > button").click()

    // // })
  
    await page.evaluate(async(s,m,page)=>{
  


    let subject= document.querySelector('[name="subject"]')!==null
    if (subject) {
      document.querySelector('[name="subject"]').value = `${s}`
    }
    

    
    // document.querySelector(".msg-form__contenteditable").value = "hello i m automation engineer"
  },subjectss)
  
  
  // await page.waitForTimeout(2000)
  // await page.type(".msg-form__contenteditable", `${msg}`, {delay: 10})

  let f=await page.url()
  let o=f.split('/')
  let username=o[4].split("-")
  console.log(username)
  const msgElementExists = await page.$('.msg-form__contenteditable');

  if (msgElementExists) {
    console.log("yes")
    await page.type(".msg-form__contenteditable", `${username + " " + msg}`, { delay: 10 });
  }
  await page.waitForTimeout(1000)
  await page.evaluate(()=>{
  let sendButtonexist=  document.querySelector(".msg-form__send-button")!==null
    if (sendButtonexist) {
      document.querySelector(".msg-form__send-button").click()
    }
  })
  // type="close"
  await page.waitForTimeout(10000)
  try{
    await page.waitForSelector(".msg-convo-wrapper",{timeout:10000})
    await page.evaluate(()=>{
      const parentElementexist = document.querySelector('.msg-convo-wrapper')!==null;
      if (parentElementexist) {
        let parentElement = document.querySelector('.msg-convo-wrapper')
        const closeButton = parentElement.querySelector('[type="close"]')!==null;
        if (closeButton) {
          parentElement.querySelector('[type="close"]').click()
          
        }
        
        
      }

   })

  }catch(err){
    console.log("the problem is in closing conver after sending msg line 170")
  }

  // await page.click('[type="close"]')


// To connect
await page.waitForTimeout(3000)

let connectb = await page.evaluate(() => {
  let ifinMailexist = document.querySelectorAll(".pvs-profile-actions__action");
  let connectexist = null;
  
  // Loop through the NodeList to find the connect button
  for (let element of ifinMailexist) {
      if (element.querySelector('[type="connect"]')) {
          connectexist = element.querySelector('[type="connect"]');
          break; // Stop the loop once the button is found
      }
  }
  try {
    if (connectexist) {
        connectexist.click();
    }
    
  } catch (error) {
    console.log("connect prbm 232")
    
  }
});

await page.waitForTimeout(6000)
// sned coonect
await page.evaluate(()=>{
  let sendexist=document.querySelector('[aria-label="Send now"]')!==null
  if (sendexist) {
    document.querySelector('[aria-label="Send now"]').click()
  }

})


try {
  await page.waitForTimeout(6000)
  
  let cancelIcon=await page.evaluate(()=>{
    let isdailouge=document.querySelector('[role="dialog"]')!==null;
    if (isdailouge) {
     let parent= document.querySelector('[role="dialog"]')
     parent.querySelector('[type="cancel-icon"]').click()
      
    }
  
  })
} catch (error) {
  console.log("the prbm from line 238")
  
}


  await page.waitForTimeout(3000)
  await page.goBack()
  await page.waitForTimeout(7000)
    
  }


}