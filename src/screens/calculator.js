import React,{Component} from 'react';
import {Text,TextInput, View ,StyleSheet,StatusBar,ScrollView} from 'react-native';
import { Input,Button ,ListItem} from 'react-native-elements';
const initialState = {
  l: 0,
  r:0,
  a:0,
  b:0,
  c:0,
  d:0,
  m:0,
  xBar:0,
  yBar:0,
  list:[],
  listO:[],
  error:""
}
class Calculator extends Component{
  constructor(props) {
    super(props);
    this.searchInput0 = React.createRef();
    this.searchInput1 = React.createRef();
    this.searchInput2 = React.createRef();
    this.searchInput3 = React.createRef();
    this.searchInput4 = React.createRef();
    this.searchInput5 = React.createRef();
    this.searchInput6 = React.createRef();
    this.state = {
      l: 0,
      r:0,
      a:0,
      b:0,
      c:0,
      d:0,
      m:0,
      xBar:0,
      yBar:0,
      list:[],
      listO:[],
      error:"",

    };
 
    this.calculate = this.calculate.bind(this);
    this.optimal_point = this.optimal_point.bind(this);
    this.setStatetoDefault= this.setStatetoDefault.bind(this);
  }
  async calculate(l,r,a,b,c,d,m) {
    var lenght = await 0;
    var redius = await 0;
    var phone_location_a =await 0;
    var phone_location_b = await 0;
    var base_station_location_c = await 0;
    var base_station_location_d = await 0;

    var base_station_error = await 0;


    var lenght = await Number(l);
    var redius = await Number(r);
    var phone_location_a =await Number(a);
    var phone_location_b = await Number(b);
    var base_station_location_c = await Number(c);
    var base_station_location_d = await Number(d);

    var base_station_error = await Number(m);
    var denominatorTheta =0;
    var numeratorTheta = 0;
    var theta = 0;
    var denominatorBeta =0;
    var numeratorBeta = 0;
    var beta  = 0;
    var x = 0;
    var y = 0;



    
    if (isFinite(lenght)
       && isFinite(redius)
       && isFinite (phone_location_a)
       && isFinite(phone_location_b)
       && isFinite(base_station_location_c)
       && isFinite(base_station_location_d)
       && isFinite(base_station_error)) { 
        numeratorTheta   = await (phone_location_b - base_station_location_d )
        denominatorTheta = await ( phone_location_a-base_station_location_c)

        theta            = await  Math.atan2(numeratorTheta,denominatorTheta ) 
        
        var x1            = await (  (  (phone_location_a - base_station_location_c)*(Math.cos(theta)) ) 
                                     +((phone_location_b -base_station_location_d)*(Math.sin(theta)))  )

        
        const logicVariablesc1= await  (x1 + redius)
        const logicVariablesc2= await(lenght-base_station_error)
        const logicVariablesc3 = await(x1- redius)
        const logicVariablesc4 = await(lenght + base_station_error)
        console.log(theta)
        console.log(numeratorTheta)
        console.log(denominatorTheta)
       /* console.log(logicVariablesc1 +" phone_location_a + redius")
        console.log(logicVariablesc2+ " lenght-base_station_error")
        console.log(logicVariablesc3 + " phone_location_a- redius")
        console.log(logicVariablesc4 + " lenght + base_station_error") */

        if(logicVariablesc1<=logicVariablesc2 ){
            //  console.log("Direct to another base station 1")
              this.setState({error:"Direct to another base station"})

        }else if(logicVariablesc3>=logicVariablesc4 ){
//console.log("Direct to another base station 2")
          this.setState({error:"Direct to another base station"})
 
        }else if(logicVariablesc2<=logicVariablesc3 ){
          //console.log("2")
          this.setState({error:"Case 1"})
          var xc            = await ( ( ((lenght + base_station_error)**2)  - (redius**2) + (x1**2))/(2*x1))
         var xc2        = await (xc**2)

         var numeratorCase1_0    = await -(((-(x1**2)+(2*x1*xc)+(redius**2)-(xc**2))**1.5)/3)
         
         
         var numeratorCase1_1    = await ( ((x1*(redius**2))/2) *( Math.asin(((xc-x1)/redius))+
                                                   (Math.PI/2)+ 
                                             0.5*(Math.sin(2*Math.asin( ((xc-x1)/redius )) ))  ) )

         var numeratorCase1_2    = await (  (   ( ((lenght+base_station_error)**2)- xc2 )**(3/2))/3 )

         var denominatorCase1_0    = await ( (((redius)**2)/2)*( (Math.PI/2)+(Math.asin(((xc-x1)/redius)))
                                             +(0.5*(Math.sin(2*Math.asin( ((xc-x1)/redius)) )))  )  )


         var denominatorCase1_1    = await ( (((lenght+base_station_error)**2)/2)*(  (Math.PI/2)
                                           -Math.asin( (xc/(lenght+base_station_error ))) 
                                           -(0.5*(Math.sin(2*Math.asin(( (xc/(lenght+base_station_error)) ) ) ) ) )  ))
        
         var xbarCase1             = await ((numeratorCase1_0+numeratorCase1_1+numeratorCase1_2) / (denominatorCase1_0+denominatorCase1_1))
         x               = await (xbarCase1*Math.cos(theta)+base_station_location_c)
         y               = await ((xbarCase1*Math.sin(theta))+base_station_location_d)
         await this.setState({xBar:x,yBar:y})
   
         // console.log(this.state.xBar+" "+this.state.yBar)
         await this.setState({list:[...this.state.list,{x,y}]})
       
/*         console.log(numeratorCase1_0)
        console.log(numeratorCase1_1)
        console.log(numeratorCase1_2)
        console.log(denominatorCase1_0)
        console.log(denominatorCase1_1)
        console.log(xbarCase1) */
        }else if(logicVariablesc1<=logicVariablesc4 ){
          //console.log("3")
          this.setState({error:"Case 2"})
          var xc            = await ( ( ((lenght - base_station_error)**2)  - (redius**2) + (x1**2))/(2*x1))

            var xc2        = await (xc**2)

            var numeratorCase1_0    = await -((((-(x1**2)+(2*x1*xc)+(redius**2)-(xc**2)))**1.5)/3)
            
            
            var numeratorCase1_1    = await ( ((x1*(redius**2))/2) *( Math.asin(((xc-x1)/redius))+
                                                      (Math.PI/2)+ 
                                                0.5*(Math.sin(2*Math.asin( ((xc-x1)/redius )) ))  ) )
  
            var numeratorCase1_2    = await (  (   ( ((lenght-base_station_error)**2)- xc2 )**(3/2))/3 )
  
            var denominatorCase1_0    = await ( (((redius)**2)/2)*( (Math.PI/2)+(Math.asin(((xc-x1)/redius)))
                                                +(0.5*(Math.sin(2*Math.asin( ((xc-x1)/redius)) )))  )  )
  
  
            var denominatorCase1_1    = await ( (((lenght-base_station_error)**2)/2)*(  (Math.PI/2)
                                              -Math.asin( (xc/(lenght-base_station_error ))) 
                                              -(0.5*(Math.sin(2*Math.asin(( (xc/(lenght-base_station_error)) ) ) ) ) )  ))
          
            var xbarCase1             = await ((numeratorCase1_0+numeratorCase1_1+numeratorCase1_2) / (denominatorCase1_0+denominatorCase1_1))
            x               = await ((xbarCase1*Math.cos(theta))+base_station_location_c)
            y               = await ((xbarCase1*Math.sin(theta))+base_station_location_d)
            await this.setState({xBar:x,yBar:y})
  
            // console.log(this.state.xBar+" "+this.state.yBar)
            await this.setState({list:[...this.state.list,{x,y}]})
          
/*           console.log(numeratorCase1_0)
          console.log(numeratorCase1_1)
          console.log(numeratorCase1_2)
          console.log(denominatorCase1_0)
          console.log(denominatorCase1_1)
          console.log(xbarCase1) */
        }else{
          this.setState({error:"Case 3"})
          var xc            = await ( ( ((lenght + base_station_error)**2)  - (redius**2) + (x1**2))/(2*x1))
          var xc2        = await (xc**2)
 
          var xa            = await ( ( ((lenght - base_station_error)**2)  - (redius**2) + (x1**2))/(2*x1))
          var xa2        = await (xa**2)

          var numeratorCase1_0    = await -(((-(x1**2)+(2*x1*xa)+(redius**2)-(xa**2))**1.5)/3)
          
          
          var numeratorCase1_1    = await ( ((x1*(redius**2))/2) *( Math.asin(((xa-x1)/redius))+
                                                    (Math.PI/2)+ 
                                              0.5*(Math.sin(2*Math.asin( ((xa-x1)/redius )) ))  ) )
 
          var numeratorCase1_2    = await (  (   ( ((lenght-base_station_error)**2)- xa2 )**(3/2))/3 )
 
          var denominatorCase1_0    = await ( (((redius)**2)/2)*( (Math.PI/2)+(Math.asin(((xa-x1)/redius)))
                                              +(0.5*(Math.sin(2*Math.asin( ((xa-x1)/redius)) )))  )  )
 
 
          var denominatorCase1_1    = await ( (((lenght-base_station_error)**2)/2)*(  (Math.PI/2)
                                            -Math.asin( (xa/(lenght-base_station_error ))) 
                                            -(0.5*(Math.sin(2*Math.asin(( (xa/(lenght-base_station_error)) ) ) ) ) )  ))
         
          var xbarCase1             = await ((numeratorCase1_0+numeratorCase1_1+numeratorCase1_2) / (denominatorCase1_0+denominatorCase1_1))
          

          var A1 = await (denominatorCase1_0+denominatorCase1_1)

          
          var numeratorCase1_0    = await -(((-(x1**2)+(2*x1*xc)+(redius**2)-(xc**2))**1.5)/3)
          
          
          var numeratorCase1_1    = await ( ((x1*(redius**2))/2) *( Math.asin(((xc-x1)/redius))+
                                                    (Math.PI/2)+ 
                                              0.5*(Math.sin(2*Math.asin( ((xc-x1)/redius )) ))  ) )
 
          var numeratorCase1_2    = await (  (   ( ((lenght+base_station_error)**2)- xc2 )**(3/2))/3 )
 
          var denominatorCase1_0    = await ( (((redius)**2)/2)*( (Math.PI/2)+(Math.asin(((xc-x1)/redius)))
                                              +(0.5*(Math.sin(2*Math.asin( ((xc-x1)/redius)) )))  )  )
 
 
          var denominatorCase1_1    = await ( (((lenght+base_station_error)**2)/2)*(  (Math.PI/2)
                                            -Math.asin( (xc/(lenght+base_station_error ))) 
                                            -(0.5*(Math.sin(2*Math.asin(( (xc/(lenght+base_station_error)) ) ) ) ) )  ))
         
          var xbarCase2             = await ((numeratorCase1_0+numeratorCase1_1+numeratorCase1_2) / (denominatorCase1_0+denominatorCase1_1))
          
          var A2 = await (denominatorCase1_1+denominatorCase1_0)

          


          var xbarCase3 = await (((A2*xbarCase2) - (A1*xbarCase1))/(A2-A1))
          
          x               = await ((xbarCase3*Math.cos(theta))+base_station_location_c)
          y               = await ((xbarCase3*Math.sin(theta))+base_station_location_d)
          await this.setState({xBar:x,yBar:y})
 
          // console.log(this.state.xBar+" "+this.state.yBar)
          await this.setState({list:[...this.state.list,{x,y}]})
        
/*          console.log(numeratorCase1_0)
         console.log(numeratorCase1_1)
         console.log(numeratorCase1_2)
         console.log(denominatorCase1_0)
         console.log(denominatorCase1_1)
         console.log(xbarCase1) */
         // console.log("case 3")
        

/*         numeratorTheta   = await (base_station_location_d - phone_location_b)
        denominatorTheta = await (base_station_location_c - phone_location_a)
        theta            = await Number (Math.atan2(denominatorTheta,numeratorTheta ) )

        var numeratorBeta_a_1 = await ((Math.cos(theta)**2))
        var numeratorBeta_a_2 = await ((base_station_location_c-phone_location_a)**2)
        var numeratorBeta_a = (numeratorBeta_a_1*numeratorBeta_a_2)
        var numeratorBeta_b = await ((2*(lenght**2))+(2*(redius**2)))
        var numeratorBeta_c = await ((base_station_location_c-phone_location_a)**4)
        var numeratorBeta_d_1 = await (((lenght**2)-(redius**2))**2)
        var numeratorBeta_d_2 = await (Math.cos(theta)**4)
        var numeratorBeta_d = await numeratorBeta_d_1* numeratorBeta_d_2
        numeratorBeta = ((numeratorBeta_a*numeratorBeta_b) - numeratorBeta_c - numeratorBeta_d)

        denominatorBeta = await ((lenght**2 - redius**2)*(Math.cos(theta)**2) + ((base_station_location_c-phone_location_a)**2))
        beta            = await Number (denominatorBeta,Math.atan2(Math.sqrt(numeratorBeta)) )
        var numeratorX_Y_1  = await((3*(lenght**2))+(base_station_error**2))/lenght
        var numeratorX_Y_2  = await Math.sin(beta)/(3*beta)
        var numeratorX_Y_3  = await Math.cos(theta)
        var numeratorX_Y_4  = await Math.sin(theta)
        var numeratorX_Y_5  = await (parseFloat(numeratorX_Y_1)* parseFloat(parseFloat(numeratorX_Y_2) * parseFloat(numeratorX_Y_3)))
        var numeratorX_Y_6 = await  (parseFloat(numeratorX_Y_1) * parseFloat(parseFloat(numeratorX_Y_2) * parseFloat(numeratorX_Y_4)))
        console.log(numeratorX_Y_1)
        console.log(numeratorX_Y_2)
        console.log(numeratorX_Y_3)
        console.log(numeratorX_Y_4)
        console.log(numeratorX_Y_5)
        console.log(numeratorX_Y_6) 
        x               = await (numeratorX_Y_5+ phone_location_a)
        y               = await (numeratorX_Y_6+ phone_location_b)

        //console.log(numeratorBeta+" "+ beta+" "+ theta+" "+ x+" "+ y)
        //console.log(theta+" "+beta)
       await this.setState({xBar:x,yBar:y})
       // console.log(this.state.xBar+" "+this.state.yBar)
       await this.setState({list:[...this.state.list,{x,y}]})
      // console.log(this.state.list)
       this.setState({error:""}) */
        }
    }else{
    this.setState({error:"please enter number"})
    }
  }

 async optimal_point(){
    var optimalX= 0;
    var optimalY= 0;
    this.state.list.forEach( (Item) =>{
      optimalX+= Item.x
      optimalY += Item.y
  });
  var optimalXc=await optimalX/this.state.list.length
  var optimalYc=await optimalY/this.state.list.length
  await this.setState({listO:[...this.state.listO,{optimalXc,optimalYc}]})
  }
  setStatetoDefault(){
    this.setState(initialState);
    this.searchInput0.current.clear();
    this.searchInput1.current.clear();
    this.searchInput2.current.clear();
    this.searchInput3.current.clear();
    this.searchInput4.current.clear();
    this.searchInput5.current.clear();
    this.searchInput6.current.clear();
};
  render() {
    return (
    <ScrollView>
 
           <View style={Styles.conteinerMain}>
          <Input
              placeholder='Measured distance from cell tower'
              inputContainerStyle={{ 
                borderColor: '#000000',
                borderBottomWidth: 2,
                margin:5
              }}  
           Value = {this.state.l}
           onChangeText = {(l)=>{this.setState({l:l});}}
            autoCapitalize='none'
            autoCorrect ={false}
            ref={this.searchInput0}
            />
             <Input
              placeholder='gps error'
              inputContainerStyle={{ 
                borderColor: '#000000',
                borderBottomWidth: 2,
                margin:5
              }} 
            autoCapitalize='none'
            autoCorrect ={false}
            Value = {this.state.r}
            onChangeText = {(r)=>{this.setState({r:r})}}
            ref={this.searchInput1}
            
            />

          <Input
              placeholder='X coordinate of phone location'
              inputContainerStyle={{ 
                borderColor: '#000000',
                borderBottomWidth: 2,
                margin:5
              }} 
  

              Value = {this.state.a}
              onChangeText = {(a)=>{this.setState({a:a})}}
            autoCapitalize='none'
            autoCorrect ={false}
            ref={this.searchInput2}
            />

          <Input
              placeholder='Y coordinate of phone location'
              inputContainerStyle={{ 
                borderColor: '#000000',
                borderBottomWidth: 2,
                margin:5
              }} 
  

              Value = {this.state.b}
              onChangeText = {(b)=>{this.setState({b:b})}}
            autoCapitalize='none'
            autoCorrect ={false}
            ref={this.searchInput3}
            />
           <Input
              placeholder='X coordinate of base station'
              inputContainerStyle={{ 
                borderColor: '#000000',
                borderBottomWidth: 2,
                margin:5
              }} 
  
              Value = {this.state.c}
              onChangeText = {(c)=>{this.setState({c:c})}}
            autoCapitalize='none'
            autoCorrect ={false}
            ref={this.searchInput4}
            />
            <Input
              placeholder='Y coordinate of base station'
              inputContainerStyle={{ 
                borderColor: '#000000',
                borderBottomWidth: 2,
                margin:5
              }} 
  

              Value = {this.state.d}
              onChangeText = {(d)=>{this.setState({d:d})}}
            autoCapitalize='none'
            autoCorrect ={false}
            ref={this.searchInput5}
            />
        <Input
              placeholder='base station error'
              inputContainerStyle={{ 
                borderColor: '#000000',
                borderBottomWidth: 2,
                margin:5
              }} 
 
              Value = {this.state.m}
              onChangeText = {(m)=>{this.setState({m:m})}}
            autoCapitalize='none'
            autoCorrect ={false}
            ref={this.searchInput6}
            />
            
        <Button title ="Calculate"
 
            containerStyle={{
             width:'95%',
             margin :5,
             borderRadius:50,

            }} 
            buttonStyle={{
              backgroundColor : '#000000'
            }}
            onPress ={()=>this.calculate(this.state.l,this.state.r,this.state.a,this.state.b,this.state.c,this.state.d,this.state.m)}
            />     
 

                <View style={Styles.ListItemStyle}>
                {
                  this.state.list.map((l,i) => (
                    <ListItem key={i} bottomDivider  >
                      <ListItem.Content style={{ flex:1,flexDirection: 'row',justifyContent: 'space-between', color: '#000000', fontWeight: 'bold' }} >
                        <View>
                        <ListItem.Title  style={{ flex:1,flexDirection: 'row',justifyContent: 'space-between', color: '#000000', fontWeight: 'bold' }} >xBar</ListItem.Title>
                        <ListItem.Subtitle>{l.x}</ListItem.Subtitle>
                        </View>
                        <View>
                        <ListItem.Title  style={{ flex:1,flexDirection: 'row',justifyContent: 'space-between', color: '#000000', fontWeight: 'bold' }} >yBar</ListItem.Title>
                        <ListItem.Subtitle>{l.y}</ListItem.Subtitle>
                        </View>
                      </ListItem.Content>
                    </ListItem>
                  ))
                }
            </View>
            <Button title ="optimal point"
    
                  containerStyle={{
                    width:'95%',
                    margin :5,
                    borderRadius:50,

                  }} 
                  buttonStyle={{
                    backgroundColor : '#000000'
                  }}
                  onPress ={()=>this.optimal_point()}
                />   
                                <View style={Styles.ListItemStyle}>
                {
                  this.state.listO.map((l,i) => (
                    <ListItem key={i} bottomDivider  >
                      <ListItem.Content style={{ flex:1,flexDirection: 'row',justifyContent: 'space-between', color: '#000000', fontWeight: 'bold' }} >
                        <View>
                        <ListItem.Title  style={{ flex:1,flexDirection: 'row',justifyContent: 'space-between', color: '#000000', fontWeight: 'bold' }} >xBar optimal point</ListItem.Title>
                        <ListItem.Subtitle>{l.optimalXc}</ListItem.Subtitle>
                        </View>
                        <View>
                        <ListItem.Title  style={{ flex:1,flexDirection: 'row',justifyContent: 'space-between', color: '#000000', fontWeight: 'bold' }} >yBar optimal point</ListItem.Title>
                        <ListItem.Subtitle>{l.optimalYc}</ListItem.Subtitle>
                        </View>
                      </ListItem.Content>
                    </ListItem>
                  ))
                }
            </View> 
            <Button title ="AC"
    
              containerStyle={{
                width:'95%',
                margin :5,
                borderRadius:50,

              }} 
              buttonStyle={{
                backgroundColor : '#000000'
              }}
              onPress ={() => this.setStatetoDefault()}
            />   
            <Text style={{color: 'red'}}>{this.state.error}</Text>
   </View>
    </ScrollView> 
    )
  }
}
const Styles = StyleSheet.create ({
  conteinerMain: {
   flex: 1,
   marginTop:50,
   flexDirection: 'column',
   alignItems: 'center',
   alignSelf:'stretch',
   backgroundColor:'#ffffff',

 },
 ListItemStyle:{
   width:"100%",

 }

});
export default Calculator;