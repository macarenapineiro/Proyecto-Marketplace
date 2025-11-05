import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useSolicitud } from '../context/SolicitudContext';
import DropdownComponent from './dropDown';

export default function FormSolicitud() {
  const {agregarSolicitud} = useSolicitud();
  const categorias = [
    { label: 'Reparaciones', value: 'reparaciones' },
    { label: 'Limpieza', value: 'limpieza' },
    { label: 'Jardinería', value: 'jardineria' },
    { label: 'Electricidad', value: 'electricidad' },
    { label: 'Plomería', value: 'plomeria' },
    { label: 'Pintura', value: 'pintura' },
    { label: 'Carpintería', value: 'carpinteria' },
    { label: 'Construcción', value: 'construccion' },
    { label: 'Mecánica', value: 'mecanica' },
  ]
  const ubicaciones = [
    { label: 'Maldonado', value: 'maldonado' },
    { label: 'Punta del Este', value: 'punta_del_este' },
    { label: 'San Carlos', value: 'san_carlos' },
    { label: 'Pan de Azúcar', value: 'pan_de_azucar' },
    { label: 'Piriápolis', value: 'piriapolis' },
    { label: 'La Barra', value: 'la_barra' },
    { label: 'José Ignacio', value: 'jose_ignacio' },
    { label: 'Otro', value: 'otro' },
  ]
  const unidades = [
    { label: 'kg', value: 'kg' },
    { label: 'litros', value: 'litros' },
    { label: 'metros', value: 'metros' },
    { label: 'm²', value: 'metrosCuadrados' },
    { label: 'unidades', value: 'unidades' },
  ]

  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    categoria: '',
    ubicacion: '',
    fechaLimite: '',
    materiales: [],
  })
  const [materiales, setMateriales] = useState<{ nombre: string; cantidad: string; unidad: string }[]>([]);
  const [nuevoMaterial, setNuevoMaterial] = useState({ nombre: '', cantidad: '', unidad: '' });
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
  const [showDate, setShowDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateConfirm = (date: Date) => {
    setSelectedDate(date);
    setShowDate(false);
    setFormData(prev => ({ ...prev, fechaLimite: date.toISOString().split('T')[0] }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.titulo || !formData.descripcion || !formData.categoria || !formData.ubicacion || !formData.fechaLimite) {
      alert('Completa todos los campos');
      return;
    }
    const nuevaSolicitud = {
      ...formData,
      categoria: formData.categoria,
      ubicacion: formData.ubicacion,
      fechaLimite: formData.fechaLimite,
    };
    agregarSolicitud(nuevaSolicitud);

    // reset
    setFormData({ titulo: '', descripcion: '', fechaLimite: '', categoria: '', ubicacion: '', materiales: [] });
    setNuevoMaterial({ nombre: '', cantidad: '', unidad: '' });
    setMateriales([]);
    setSelectedDate(null);
  }

  return (
    <View>
      <View style={styles.container}>
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
        <DropdownComponent label="Categoría" data={categorias} value={formData.categoria} onValueChange={value => handleInputChange('categoria', value)} />
        <Text style={styles.label}>Ubicación</Text>
        <DropdownComponent label="Ubicación" data={ubicaciones} value={formData.ubicacion} onValueChange={value => handleInputChange('ubicacion', value)} />
        <Text style={styles.label}>Fecha requerida</Text>
        <TouchableOpacity style={styles.dateButton} onPress={() => setShowDate(true)}>
          <Text>{selectedDate ? selectedDate.toDateString() : 'Seleccionar fecha'}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={showDate}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={() => setShowDate(false)}
        />
        <Text style={styles.subtitle}>Materiales necesarios: </Text>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre del material"
          value={nuevoMaterial.nombre}
          onChangeText={text => handleMaterialChange('nombre', text)}
        />
        <Text style={styles.label}>Unidad</Text>
        <DropdownComponent label="Unidad" data={unidades} value={nuevoMaterial.unidad} onValueChange={value => handleMaterialChange('unidad', value)} />
        <Text style={styles.label}>Cantidad</Text>
        <TextInput
          style={styles.input}
          placeholder="Cantidad"
          value={nuevoMaterial.cantidad}
          onChangeText={text => handleMaterialChange('cantidad', text)}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.agregarButton} onPress={agregarMaterial}>
          <Text>Agregar Material +</Text>
        </TouchableOpacity>

        {materiales.map((m, i) => (
          <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 5 }}>
            <Text>{m.nombre} ({m.cantidad} {m.unidad})</Text>
            <TouchableOpacity onPress={() => eliminarMaterial(i)}>
              <Text style={{ color: 'red' }}>🗑️</Text>
            </TouchableOpacity>
          </View>
        ))}
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <TouchableOpacity style={styles.solicitudButton} onPress={handleSubmit}>
            <Text style={{ color: '#000', fontWeight: 'bold' }}>Crear solicitud</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => {/* lógica para cancelar */ }}>
            <Text style={{ color: '#000', fontWeight: 'bold' }}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 12,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5
  },
  agregarButton: {
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  solicitudButton: {
    backgroundColor: '#90C6DA',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center'
  },
  cancelButton: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center'
  }
})