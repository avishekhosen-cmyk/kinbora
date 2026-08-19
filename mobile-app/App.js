import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const orders = [
  ['#KB-1042', 'Maria Silva', '€129.90', 'Processing'],
  ['#KB-1041', 'João Costa', '€59.00', 'Shipped'],
  ['#KB-1040', 'Ana Santos', '€79.99', 'Delivered'],
];
const products = [
  ['Wireless Headphones', '€39.99', '24'],
  ['Kitchen Blender', '€59.00', '8'],
  ['Smart Watch', '€79.99', '3'],
];
const tools = ['Marketing','Coupons','Reviews','Returns & Refunds','Shipping','Customers','Suppliers','Purchase Orders','Expenses & Profit','Support','Staff & Permissions','Notifications','Settings','Audit Logs'];

export default function App() {
  const [tab, setTab] = useState('Dashboard');
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <View style={styles.header}><Text style={styles.brand}>Kinbora</Text><Text style={styles.subtitle}>Business Management</Text></View>
      <ScrollView contentContainerStyle={styles.content}>
        {tab === 'Dashboard' && <Dashboard />}
        {tab === 'Orders' && <Orders />}
        {tab === 'Products' && <Products />}
        {tab === 'More' && <More />}
      </ScrollView>
      <View style={styles.nav}>
        {['Dashboard','Orders','Products','More'].map(item => <TouchableOpacity key={item} style={styles.navItem} onPress={() => setTab(item)}><Text style={[styles.navIcon,tab===item&&styles.active]}>{item==='Dashboard'?'⌂':item==='Orders'?'🛒':item==='Products'?'📦':'☰'}</Text><Text style={[styles.navText,tab===item&&styles.active]}>{item}</Text></TouchableOpacity>)}
      </View>
    </SafeAreaView>
  );
}
function Dashboard(){return <><Text style={styles.muted}>Good morning</Text><Text style={styles.title}>Business Overview</Text><View style={styles.grid}><Metric label="Today's Sales" value="€268.89"/><Metric label="Orders Today" value="8"/><Metric label="Customers" value="1,284"/><Metric label="Low Stock" value="6"/></View><Text style={styles.section}>Recent Orders</Text><View style={styles.card}>{orders.map(o=><Row key={o[0]} title={o[0]} subtitle={`${o[1]} · ${o[2]}`} status={o[3]}/>)}</View><Text style={styles.section}>Business Modules</Text><View style={styles.card}><Text style={styles.moduleText}>Products · Inventory · Customers · Reports</Text><Text style={styles.moduleText}>Payments · Shipping · Returns · Refunds</Text><Text style={styles.moduleText}>Suppliers · Expenses · Profit · VAT</Text><Text style={styles.moduleText}>Marketing · Support · Staff · Audit Logs</Text></View><View style={styles.notice}><Text style={styles.noticeTitle}>Kinbora Store Connection</Text><Text style={styles.muted}>Ready for secure WooCommerce/API integration. Demo values are shown until the backend is connected.</Text></View></>}
function Orders(){return <><Text style={styles.title}>Orders</Text><View style={styles.card}>{orders.map(o=><Row key={o[0]} title={o[0]} subtitle={`${o[1]} · ${o[2]}`} status={o[3]}/>)}</View></>}
function Products(){return <><Text style={styles.title}>Products & Inventory</Text><View style={styles.card}>{products.map(p=><Row key={p[0]} title={p[0]} subtitle={`${p[1]} · Stock ${p[2]}`} status={Number(p[2])<5?'Low stock':'In stock'}/>)}</View></>}
function More(){return <><Text style={styles.title}>Business Tools</Text><View style={styles.card}>{tools.map(t=><View key={t} style={styles.tool}><Text style={styles.toolText}>{t}</Text><Text style={styles.arrow}>›</Text></View>)}</View></>}
function Metric({label,value}){return <View style={styles.metric}><Text style={styles.metricLabel}>{label}</Text><Text style={styles.metricValue}>{value}</Text></View>}
function Row({title,subtitle,status}){return <View style={styles.row}><View style={{flex:1}}><Text style={styles.rowTitle}>{title}</Text><Text style={styles.muted}>{subtitle}</Text></View><Text style={styles.pill}>{status}</Text></View>}
const styles=StyleSheet.create({safe:{flex:1,backgroundColor:'#f5f7fb'},header:{backgroundColor:'#111827',paddingHorizontal:20,paddingTop:16,paddingBottom:15},brand:{color:'#fff',fontSize:22,fontWeight:'800'},subtitle:{color:'#cbd5e1',fontSize:12,marginTop:2},content:{padding:18,paddingBottom:110},muted:{color:'#6b7280',fontSize:12},title:{color:'#111827',fontSize:26,fontWeight:'800',marginTop:4,marginBottom:18},section:{color:'#111827',fontSize:17,fontWeight:'800',marginTop:22,marginBottom:10},grid:{flexDirection:'row',flexWrap:'wrap',gap:12},metric:{width:'47%',backgroundColor:'#fff',borderRadius:17,padding:16,borderWidth:1,borderColor:'#e8ecf2'},metricLabel:{color:'#6b7280',fontSize:12},metricValue:{color:'#111827',fontSize:23,fontWeight:'800',marginTop:5},card:{backgroundColor:'#fff',borderRadius:17,paddingHorizontal:16,borderWidth:1,borderColor:'#e8ecf2'},row:{minHeight:66,flexDirection:'row',alignItems:'center',borderBottomWidth:1,borderBottomColor:'#eef1f5',gap:10},rowTitle:{color:'#111827',fontSize:14,fontWeight:'700',marginBottom:3},pill:{backgroundColor:'#eef2ff',color:'#3730a3',paddingHorizontal:9,paddingVertical:6,borderRadius:20,fontSize:10,fontWeight:'700'},moduleText:{color:'#374151',paddingVertical:9,borderBottomWidth:1,borderBottomColor:'#eef1f5',fontSize:13},notice:{marginTop:18,backgroundColor:'#fff',borderRadius:17,padding:16,borderWidth:1,borderColor:'#e8ecf2'},noticeTitle:{color:'#111827',fontSize:15,fontWeight:'800',marginBottom:5},tool:{minHeight:54,flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderBottomWidth:1,borderBottomColor:'#eef1f5'},toolText:{color:'#111827',fontSize:14,fontWeight:'600'},arrow:{color:'#9ca3af',fontSize:25},nav:{position:'absolute',bottom:0,left:0,right:0,height:76,backgroundColor:'#fff',borderTopWidth:1,borderTopColor:'#e5e7eb',flexDirection:'row',justifyContent:'space-around',paddingTop:9},navItem:{alignItems:'center',flex:1},navIcon:{fontSize:21,color:'#6b7280'},navText:{fontSize:10,color:'#6b7280',marginTop:3},active:{color:'#111827',fontWeight:'800'}});
