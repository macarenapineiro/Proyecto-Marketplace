import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function FormSolicitud() {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    fechaLimite: '',
  });

  const [materiales, setMateriales] = useState<{ nombre: string; cantidad: string; unidad: string }[]>([]);
  const [nuevoMaterial, setNuevoMaterial] = useState({ nombre: '', cantidad: '', unidad: '' });

  const [categoriaOpen, setCategoriaOpen] = useState(false);
  const [categoriaValue, setCategoriaValue] = useState<string | null>(null);
  const [categoriaItems, setCategoriaItems] = useState([
    { label: 'Reparaciones', value: 'reparaciones' },
    { label: 'Limpieza', value: 'limpieza' },
    { label: 'Jardinería', value: 'jardineria' },
    { label: 'Electricidad', value: 'electricidad' },
    { label: 'Plomería', value: 'plomeria' },
    { label: 'Pintura', value: 'pintura' },
    { label: 'Carpintería', value: 'carpinteria' },
    { label: 'Construcción', value: 'construccion' },
    { label: 'Mecánica', value: 'mecanica' },
  ]);

  const [ubicacionOpen, setUbicacionOpen] = useState(false);
  const [ubicacionValue, setUbicacionValue] = useState<string | null>(null);
  const [ubicacionItems, setUbicacionItems] = useState([
    { label: 'Maldonado', value: 'maldonado' },
    { label: 'Punta del Este', value: 'punta_del_este' },
    { label: 'San Carlos', value: 'san_carlos' },
    { label: 'Pan de Azúcar', value: 'pan_de_azucar' },
    { label: 'Piriápolis', value: 'piriapolis' },
    { label: 'La Barra', value: 'la_barra' },
    { label: 'José Ignacio', value: 'jose_ignacio' },
    { label: 'Otro', value: 'otro' },
  ]);

  const [showDate, setShowDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMaterialChange = (field: string, value: string) => {
    setNuevoMaterial(prev => ({ ...prev, [field]: value }));
  };

  const agregarMaterial = () => {
    if (!nuevoMaterial.nombre || !nuevoMaterial.unidad || !nuevoMaterial.cantidad) return;
    setMateriales(prev => [...prev, nuevoMaterial]);
    setNuevoMaterial({ nombre: '', unidad: '', cantidad: '' });
  };

  const eliminarMaterial = (index: number) => {
    setMateriales(prev => prev.filter((_, i) => i !== index));
  };

  const handleDateConfirm = (date: Date) => {
    setSelectedDate(date);
    setShowDate(false);
  };

  const handleSubmit = () => {
    if (!formData.titulo || !formData.descripcion || !categoriaValue || !ubicacionValue || !selectedDate) {
      alert('Completa todos los campos');
      return;
    }

    const nuevaSolicitud = {
      ...formData,
      categoria: categoriaValue,
      ubicacion: ubicacionValue,
      fechaLimite: selectedDate.toISOString().split('T')[0],
      materiales,
    };

    console.log('Solicitud creada:', nuevaSolicitud);
    // reset
    setFormData({ titulo: '', descripcion: '', fechaLimite: '' });
    setCategoriaValue(null);
    setUbicacionValue(null);
    setSelectedDate(null);
    setMateriales([]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Crear nueva solicitud</Text>

      <Text style={styles.label}>Título del servicio</Text>
      <TextInput
        style={styles.input}
        value={formData.titulo}
        onChangeText={text => handleInputChange('titulo', text)}
        placeholder="Ej. Reparación del techo"
      />

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={styles.input}
        value={formData.descripcion}
        onChangeText={text => handleInputChange('descripcion', text)}
        placeholder="Describe el servicio"
        multiline
      />

      <Text style={styles.label}>Categoría</Text>
      <DropDownPicker
        open={categoriaOpen}
        value={categoriaValue}
        items={categoriaItems}
        setOpen={setCategoriaOpen}
        setValue={setCategoriaValue}
        setItems={setCategoriaItems}
        placeholder="Seleccionar categoría"
        zIndex={1000}
      />

      <Text style={styles.label}>Ubicación</Text>
      <DropDownPicker
        open={ubicacionOpen}
        value={ubicacionValue}
        items={ubicacionItems}
        setOpen={setUbicacionOpen}
        setValue={setUbicacionValue}
        setItems={setUbicacionItems}
        placeholder="Seleccionar ubicación"
        zIndex={900}
      />

      <Text style={styles.label}>Fecha límite</Text>
      <TouchableOpacity style={styles.dateButton} onPress={() => setShowDate(true)}>
        <Text>{selectedDate ? selectedDate.toDateString() : 'Seleccionar fecha'}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={showDate}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={() => setShowDate(false)}
      />

      {/* <Text style={styles.label}>Materiales necesarios</Text>
      <View style={styles.materialRow}>
        <TextInput
          style={[styles.input, { flex: 2 }]}
          placeholder="Nombre del material"
          value={nuevoMaterial.nombre}
          onChangeText={text => handleMaterialChange('nombre', text)}
        />
        <DropDownPicker
          open={nuevoMaterial.unidad === ''} // workaround
          value={nuevoMaterial.unidad}
          items={[
            { label: 'kg', value: 'kg' },
            { label: 'litros', value: 'litros' },
            { label: 'metros', value: 'metros' },
            { label: 'm²', value: 'metrosCuadrados' },
            { label: 'unidades', value: 'unidades' },
          ]}
          setOpen={() => {}}
          setValue={value => handleMaterialChange('unidad', value)}
          setItems={() => {}}
          placeholder="Unidad"
          style={{ flex: 1 }}
        />
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Cantidad"
          value={nuevoMaterial.cantidad}
          onChangeText={text => handleMaterialChange('cantidad', text)}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.addButton} onPress={agregarMaterial}>
          <Text>➕</Text>
        </TouchableOpacity>
      </View> */}

      {materiales.map((m, i) => (
        <View key={i} style={styles.materialItem}>
          <Text>{m.nombre} - {m.cantidad} {m.unidad}</Text>
          <TouchableOpacity onPress={() => eliminarMaterial(i)}>
            <Text style={{ color: 'red' }}>🗑️</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Crear solicitud</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  label: { fontWeight: 'bold', marginTop: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10 },
  dateButton: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10 },
  materialRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  addButton: { padding: 10, backgroundColor: '#eee', borderRadius: 5, marginLeft: 5 },
  materialItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 5, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 5 },
  submitButton: { backgroundColor: '#000', padding: 15, borderRadius: 8, marginTop: 10, alignItems: 'center' },
});
